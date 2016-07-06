import { spawn } from 'child_process'
export const command = 'run [task]'
export const description = 'run Gulpfile tasks'
export const options = [{
  flags: '-S, --silent',
  description: 'do not show gulp data'
}]

export const action = () => (task = 'default', { silent }) => {
  const args = [task]

  if (silent) {
    args.unshift('--silent')
  }

  process.env.PATH = `./node_modules/.bin/:${process.env.PATH}`

  return spawn('gulp', args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
  })
  .on('close', (code) => process.exit(code))
}
