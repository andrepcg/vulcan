import gulp from 'core/gulp'

export const command = 'run [task]'
export const description = 'run Gulpfile tasks'
export const options = [{
  flags: '-e, --env <env>',
  description: 'set environment to run gulp in'
}]

export const action = () => (task = 'index', { env = 'development' }) => {
  process.env.NODE_ENV = env
  gulp.on('stop', (e) => process.exit(0)).start(task)
}
