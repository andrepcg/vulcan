import welcome from 'app/controllers/welcome'
import mail from 'app/controllers/mail'
import * as users from 'app/controllers/users'
import api from 'app/middleware/api'

export default function () {
  this.get('home', '/', welcome())
  this.get('mail', '/mail', mail())
  this.resource('/users', api(), users)
}
