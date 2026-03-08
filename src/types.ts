import type { TapConfig, Tap as TapClient } from '@atproto/tap'
import type { Secret } from '@poppinss/utils'

type TapConfigWithAdminPassword = Omit<TapConfig, 'adminPassword'>

export type Config = {
  url: string
  adminPassword?: string | Secret<string>
} & TapConfigWithAdminPassword

export type TapProviderConfig = {
  url: Config['url']
  adminPassword?: string | Secret<string>
  config: TapConfigWithAdminPassword
}

export type Tap = Pick<TapClient, 'addRepos' | 'removeRepos' | 'getRepoInfo' | 'resolveDid'>
