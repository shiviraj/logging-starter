export const Integer = {
  ZERO: 0,
  IV_LENGTH: 16,
  SECRET_STRING_LENGTH: 32
}

const encryptionKey = (process.env.LOGGING_ENCRYPTION_KEY ?? '').trim().padStart(Integer.SECRET_STRING_LENGTH, '0')
const encryptionEnabled = (process.env.LOGGING_ENCRYPTION_ENABLED ?? 'false').trim()

const config = {
  encryptionKey,
  encryptionEnabled: encryptionEnabled.toLowerCase() === 'true',
  iv: Buffer.from(encryptionKey).subarray(Integer.ZERO, Integer.IV_LENGTH)
}

export default config
