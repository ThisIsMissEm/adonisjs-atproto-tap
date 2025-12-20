import { Tap as TapClient } from '@atproto/tap'
import { Tap } from './types.js'

export default class TapApi implements Tap {
  constructor(protected client: TapClient) {}

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
