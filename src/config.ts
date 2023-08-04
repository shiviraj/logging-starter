const encryptionKey = (process.env.LOGGING_ENCRYPTION_KEY ?? '').trim()
const encryptionEnabled = (process.env.LOGGING_ENCRYPTION_ENABLED ?? encryptionKey).trim() || 'false'

export const Integer = {
  ZERO: 0,
  SECRET_STRING_LENGTH: 32
}

const config = {
  encryptionKey: encryptionKey ? encryptionKey.padStart(Integer.SECRET_STRING_LENGTH, '0') : encryptionKey,
  encryptionEnabled: encryptionEnabled.toLowerCase() === 'true'
}

export default config
