import { resolve } from 'path'
import { readdirSync } from 'fs'
import chalk from 'chalk'
import prettyTime from 'pretty-hrtime'
import gulp from 'gulp'
import gutil from 'gulp-util'

const formatError = (e) => {
  if (!e.err) {
    return e.message
  }

  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString()
  }

  if (e.err.stack) {
    return e.err.stack
  }

  return new Error(String(e.err)).stack
}

readdirSync(resolve('tasks'))
  .map((file) => ({ name: file.replace(/^(.+)\.js/, '$1'), task: require(resolve(`tasks/${file}`)) }))
  .map(({ name, task }) => gulp.task(name, (task.default ? task.default : task).bind(gulp)))

gulp.on('task_start', (e) => {
  gutil.log(`Starting ${chalk.cyan(e.task)}...`)
})

gulp.on('task_stop', (e) => {
  const time = prettyTime(e.hrDuration)
  gutil.log(`Finished ${chalk.cyan(e.task)} after ${chalk.magenta(time)}`)
})

gulp.on('task_not_found', (e) => {
  gutil.log(`Task ${e.task} is not in your gulpfile`)
  process.exit(1)
})

gulp.on('task_error', (e) => {
  const message = formatError(e)
  const time = prettyTime(e.hrDuration)

  gutil.log(`${chalk.cyan(e.task)} ${chalk.red('errored after')} ${chalk.magenta(time)}`)
  gutil.log(message)
})

export default gulp
