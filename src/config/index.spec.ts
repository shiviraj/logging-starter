import config from './index'

describe('Config test', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should match with the config', () => {
    expect(config).toStrictEqual({
      encryptionEnabled: false,
      encryptionKey: '00000000000000000000000000000000',
      iv: Buffer.from('00000000000000000000000000000000').subarray(0, 16)
    })
  })

  it('should match with the config', () => {
    jest.replaceProperty(process, 'env', {})

    expect(config).toStrictEqual({
      encryptionEnabled: false,
      encryptionKey: '00000000000000000000000000000000',
      iv: Buffer.from('00000000000000000000000000000000').subarray(0, 16)
    })
  })
})
