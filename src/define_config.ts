import type { Config, TapProviderConfig } from './types.js'

export function defineConfig<T extends Config>(config: T): TapProviderConfig {
  const tapConfig: TapProviderConfig = {
    url: config.url,
    config: {},
  }

  // Sensible default:
  if (typeof tapConfig.url === 'undefined') {
    config.url = 'http://localhost:2480/'
  }

  // Copy across the admin password if any:
  if (config && typeof config.adminPassword === 'string') {
    tapConfig.config.adminPassword = config.adminPassword
  }

  return tapConfig
}
