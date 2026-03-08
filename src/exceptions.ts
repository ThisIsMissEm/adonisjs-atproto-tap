import { createError } from '@poppinss/utils/exception'

export const E_MISSING_URL = createError('Missing url for Tap', 'E_MISSING_TAP_URL')

export const E_MISSING_ADMIN_PASSWORD = createError(
  'Missing adminPassword for Tap, this is required in production, and must be at least 16 characters long',
  'E_MISSING_TAP_ADMIN_PASSWORD'
)

export const E_INSECURE_ADMIN_PASSWORD = createError(
  'The value of your adminPassword for Tap should be at least 16 characters long',
  'E_INSECURE_TAP_ADMIN_PASSWORD'
)
