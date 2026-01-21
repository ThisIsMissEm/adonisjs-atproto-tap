import { RuntimeException } from '@adonisjs/core/exceptions'
import { Tap } from '@atproto/tap'
import type { ApplicationService } from '@adonisjs/core/types'
import type { TapProviderConfig } from '../src/types.js'
import TapApi from '../src/api.js'
import { ContainerProviderContract } from '@adonisjs/core/types/app'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    'tap.client': Tap
    'tap.api': TapApi
  }
}

export default class TapProvider implements ContainerProviderContract {
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

    this.app.container.singleton('tap.api', async (resolver) => {
      const client = await resolver.make('tap.client')
      return new TapApi(client, this.app)
    })
  }
}
