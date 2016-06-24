import { resolve } from 'path'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'
import { htmlToText } from 'nodemailer-html-to-text'
import { defaultsDeep, isFunction } from 'lodash'
import cons from 'co-views'
import consoleTransport from 'core/console-transport'
import fileTransport from 'core/file-transport'

const services = {
  console: consoleTransport,
  file: fileTransport,
  mailgun: {
    host: 'smtp.mailgun.org',
    port: 587
  },
  mandrill: {
    host: 'smtp.mandrillapp.com',
    port: 587
  },
  postmark: {
    host: 'smtp.postmarkapp.com',
    port: 2525
  },
  yahoo: {
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true
  },
  gmail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true
  }
}

const $createTransport = (service, opts) => {
  const transport = services[service]
  if (isFunction(transport)) {
    return nodemailer.createTransport(transport(opts))
  }
  return nodemailer.createTransport(defaultsDeep({}, services[service], { auth: opts }))
}

export class Mailer {
  constructor (service, opts, views) {
    this.$transport = $createTransport(service, opts)
    this.$render = cons(resolve('app/views'), defaultsDeep({}, views, { ext: views.extension }))
  }

  use (...args) {
    this.$transport.use(...args)
    return this
  }

  send (temp, opts) {
    return new Promise((resolve, reject) => {
      const locals = opts.locals || {}
      delete opts.locals
      this.$render(temp, defaultsDeep({}, opts, locals))
        .then((html) => {
          this.$transport.sendMail(defaultsDeep({}, opts, { html, xMailer: false }), (err, info) => {
            if (err) {
              return reject(err)
            }
            return resolve(info)
          })
        })
    })
  }
}

export default ({ service, options, views }) => function * (next) {
  this.mailer = new Mailer(service, options, views).use('compile', htmlToText())
  yield next
}
