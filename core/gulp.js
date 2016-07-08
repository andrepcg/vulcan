import chalk from 'chalk'
import prettyTime from 'pretty-hrtime'
import gulp from 'gulp'
import 'gulpfile'

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

gulp.on('task_start', (e) => {
  console.log(`Starting ${chalk.cyan(e.task)}...`)
})

gulp.on('task_stop', (e) => {
  const time = prettyTime(e.hrDuration)
  console.log(`Finished ${chalk.cyan(e.task)} after ${chalk.magenta(time)}`)
})

gulp.on('task_not_found', (e) => {
  console.log(`Task ${e.task} is not in your gulpfile`)
  process.exit(1)
})

gulp.on('task_error', (e) => {
  const message = formatError(e)
  const time = prettyTime(e.hrDuration)

  console.log(`${chalk.cyan(e.task)} ${chalk.red('errored after')} ${chalk.magenta(time)}`)
  console.log(message)
})

export default gulp
