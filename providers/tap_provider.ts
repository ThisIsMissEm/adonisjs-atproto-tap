import type { ApplicationService } from '@adonisjs/core/types'
import type { ContainerProviderContract } from '@adonisjs/core/types/app'
import type { TapProviderConfig } from '../src/types.js'
import type { TapConfig } from '@atproto/tap'

import { RuntimeException } from '@adonisjs/core/exceptions'
import { Tap } from '@atproto/tap'
import TapApi from '../src/api.js'

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
      const tapConfig: TapConfig = config.config ?? {}

      if (!config || !config.url) {
        throw new RuntimeException(
          'Invalid config exported from "config/tap.ts" file. Make sure to return an object with the url property defined'
        )
      }

      if (config.adminPassword) {
        tapConfig.adminPassword =
          typeof config.adminPassword === 'string'
            ? config.adminPassword
            : config.adminPassword.release()
      } else if (this.app.inProduction) {
        throw new RuntimeException(
          'Tap is configured insecurely without an adminPassword in production.'
        )
      }

      return new Tap(config.url, tapConfig)
    })

    this.app.container.singleton('tap.api', async (resolver) => {
      const client = await resolver.make('tap.client')
      return new TapApi(client, this.app)
    })
  }
}
