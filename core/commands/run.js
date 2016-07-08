import gulp from 'core/gulp'

export const command = 'run [task]'
export const description = 'run Gulpfile tasks'
export const options = [{
  flags: '-e, --env <env>',
  description: 'set environment to run gulp in'
}]

export const action = (done) => (task = 'default', { silent = false, env = 'development' }) => {
  process.env.NODE_ENV = env

  gulp.on('stop', (e) => done()).start(task)
}
