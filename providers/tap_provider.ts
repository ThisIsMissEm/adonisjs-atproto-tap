import { RuntimeException } from '@adonisjs/core/exceptions'
import { Tap, SimpleIndexer, TapChannel } from '@atproto/tap'
import type { ApplicationService } from '@adonisjs/core/types'
import type { TapProviderConfig } from '../src/types.js'
import TapApi from '../src/api.js'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    'tap.client': Tap
    'tap.indexer': SimpleIndexer
    'tap.api': TapApi
  }
}

export default class TapProvider {
  private channel?: TapChannel

  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('tap.client', async () => {
      const config = this.app.config.get<TapProviderConfig>('tap', {})

      if (!config || !config.url) {
        throw new RuntimeException(
          'Invalid config exported from "config/tap.ts" file. Make sure to return an object with the url property defined'
        )
      }

      return new Tap(config.url, config.config ?? {})
    })

    this.app.container.singleton('tap.indexer', () => {
      return new SimpleIndexer()
    })

    this.app.container.singleton('tap.api', async (resolver) => {
      const client = await resolver.make('tap.client')
      return new TapApi(client)
    })
  }

  async boot() {
    const logger = await this.app.container.make('logger')
    const indexer = await this.app.container.make('tap.indexer')

    indexer.error((err) => logger.error(err, 'Tap indexer error'))
  }

  async start() {
    if (this.app.getEnvironment() === 'web') {
      const tap = await this.app.container.make('tap.client')
      const indexer = await this.app.container.make('tap.indexer')

      this.channel = tap.channel(indexer)
      this.channel.start()
    }
  }

  async shutdown() {
    if (this.channel) {
      await this.channel.destroy()
    }
  }
}
