export default function () {
  this.watch(['assets/styles/**/*.scss'], ['styles'])
  this.watch(['assets/scripts/**/*.js'], ['scripts'])
}
