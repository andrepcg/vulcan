export default () => function * () {
  const res = yield this.mailer.send('emails/welcome', {
    from: 'vulcan@anifty.co',
    to: 'john.doe@example.com',
    subject: `Welcome to Vulcan!`,
    locals: {
      name: 'John Doe'
    }
  })
  return yield this.send({ res })
}
