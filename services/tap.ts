import app from '@adonisjs/core/services/app'
import type TapApi from '../src/api.js'

let tap: TapApi

await app.booted(async () => {
  tap = await app.container.make('tap.api')
})

export { tap as default }
