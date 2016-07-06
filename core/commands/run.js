import { spawn } from 'child_process'
import { defaultsDeep } from 'lodash'

export const command = 'run [task]'
export const description = 'run Gulpfile tasks'
export const options = [{
  flags: '-S, --silent',
  description: 'do not show gulp data'
}, {
  flags: '-e, --env <env>',
  description: 'set environment to run gulp in'
}]

export const action = () => (task = 'default', { silent = false, env = 'development' }) => {
  const args = [task]

  if (silent) {
    args.unshift('--silent')
  }

  process.env.NODE_ENV = env

  return spawn('gulp', args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
  })
  .on('close', (code) => process.exit(code))
  .on('error', (err) => console.error(err))
}
