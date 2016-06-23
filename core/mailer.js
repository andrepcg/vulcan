import Promise from 'bluebird'
import nodemailer from 'nodemailer'
import stubTransport from 'nodemailer-stub-transport'
import { defaultsDeep, isFunction } from 'lodash'

import config from 'core/config'

const services = {
  stub: stubTransport,
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
  constructor (service, opts) {
    this.$transport = $createTransport(service, opts)
  }

  use (...args) {
    this.$transport.use(...args)
    return this
  }

  send (opts) {
    return new Promise((resolve, reject) => {
      this.$transport.sendMail(opts, (err, info) => {
        if (err) {
          return reject(err)
        }
        return resolve(info)
      })
    })
  }
}

export default new Mailer(config.get('mail.service'), config.get(`mail.services[${config.get('mail.service')}]`, null))
