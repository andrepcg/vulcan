import gulp from 'gulp'

gulp.task('watch', () => {
  console.log('file changed!')
})

gulp.task('default', () => {
  return gulp.watch('core/**/*', ['watch'])
})
