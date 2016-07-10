import { resolve } from 'path'
import env from '@niftyco/env'
import sass from 'gulp-sass'
import ifTrue from 'gulp-if'
import minify from 'gulp-minify-css'
import livereload from 'gulp-livereload'

export const description = 'build styles with sass'

export default function () {
  return this.src(['assets/styles/app.scss'])
    .pipe(sass({
      includePaths: [resolve('node_modules')]
    }))
    .pipe(ifTrue(env.get('node_env', false) === 'production', minify()))
    .pipe(this.dest('public/'))
    .pipe(livereload())
}
