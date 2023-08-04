class DecryptionError extends Error {
  constructor(message?: string) {
    super(message ?? 'Failed to decrypt text')
    this.name = 'DecryptionError'
  }
}

export default DecryptionError
