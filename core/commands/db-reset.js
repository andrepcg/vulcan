import { basename } from 'path'
import { db } from 'core/bookshelf'

export const command = 'db:reset'
export const description = 'reset database and run migrations'

export const action = (done) => () => {
  db.migrate.forceFreeMigrationsLock()
  .then(() => db.migrate._listCompleted())
  .then((completed) => db.migrate._waterfallBatch(0, completed.reverse(), 'down'))
  .then(() => db.migrate.latest())
  .spread((batch, migrations) => {
    if (migrations.length === 0) {
      console.log('Already up to date')
    } else {
      console.log(`Batch ${batch} ran ${migrations.length} migrations:`)
      migrations.map((file) => console.log(basename(file, '.js')))
    }
    done()
  })
}
