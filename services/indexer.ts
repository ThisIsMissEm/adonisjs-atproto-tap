/*
 * @adonisjs/transmit
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import app from '@adonisjs/core/services/app'
import { SimpleIndexer } from '@atproto/tap'

let indexer: SimpleIndexer

await app.booted(async () => {
  indexer = await app.container.make('tap.indexer')
})

export { indexer as default }
