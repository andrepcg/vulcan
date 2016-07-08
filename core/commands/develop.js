import env from '@niftyco/env'
import config from 'core/config'
import server from 'core/server'
import gulp from 'core/gulp'

export const command = 'develop'
export const description = 'start app and run default gulp task'
export const options = [{
  flags: '-p, --port [int]',
  description: 'the port the app will be running on',
  default: env.get('port', config.get('app.port', 1337))
}]

export const action = (done) => ({ port }) => {
  server(port, true, () => gulp.start('default'))
}
