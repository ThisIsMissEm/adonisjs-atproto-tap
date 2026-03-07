import type { TapChannel, Tap as TapClient, TapHandler } from '@atproto/tap'
import type { Tap } from './types.js'
import type { ApplicationService } from '@adonisjs/core/types'
import { RuntimeException } from '@adonisjs/core/exceptions'

export default class TapApi implements Tap {
  #channel?: TapChannel
  #indexer?: TapHandler

  constructor(
    protected client: TapClient,
    protected app: ApplicationService
  ) {}

  setIndexer(indexer: TapHandler) {
    this.#indexer = indexer
  }

  startIndexer() {
    if (!this.#indexer) {
      throw new RuntimeException('tap.setIndexer was never called')
    }

    if (this.#channel) {
      throw new RuntimeException('tap.startIndexer invoked multiple times')
    }

    this.#channel = this.client.channel(this.#indexer)
    this.#channel.start()

    this.app.terminating(async () => {
      await this.#channel?.destroy()
    })
  }

  async addRepos(dids: string[]) {
    return this.client.addRepos(dids)
  }

  async removeRepos(dids: string[]) {
    return this.client.removeRepos(dids)
  }

  async resolveDid(did: string) {
    return this.client.resolveDid(did)
  }

  async getRepoInfo(did: string) {
    return this.client.getRepoInfo(did)
  }
}
