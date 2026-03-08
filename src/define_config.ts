import type { Config, TapProviderConfig } from './types.js'

export function defineConfig<T extends Config>({
  url,
  adminPassword,
  ...config
}: T): TapProviderConfig {
  const tapConfig: TapProviderConfig = {
    url,
    adminPassword,
    config,
  }

  // Sensible default:
  if (typeof tapConfig.url === 'undefined') {
    tapConfig.url = 'http://localhost:2480'
  }

  return tapConfig
}
