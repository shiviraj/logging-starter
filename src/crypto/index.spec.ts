import {decryptData, encryptData} from './index'
import config from '../config'
import logger from '../logger'
import DecryptionError from '../errors/decryptionError'

describe('Crypto Test', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should encrypt the given text', () => {
    jest.replaceProperty(config, 'encryptionKey', 'encryptionKey'.padStart(32, '0'))
    jest.replaceProperty(config, 'encryptionEnabled', true)
    jest.replaceProperty(config, 'iv', Buffer.from('encryptionKeyencryptionKey').subarray(0, 16))

    const actual = encryptData({data: 'text'})

    expect(actual).toStrictEqual({encryptedData: 'a+3Bp4F37eZXJxVb8Oy3'})
  })

  it('should encrypt the given text with no data', () => {
    jest.replaceProperty(config, 'encryptionKey', 'encryptionKey'.padStart(32, '0'))
    jest.replaceProperty(config, 'encryptionEnabled', true)
    jest.replaceProperty(config, 'iv', Buffer.from('encryptionKeyencryptionKey').subarray(0, 16))

    const actual = encryptData()

    expect(actual).toStrictEqual({encryptedData: 'a7I='})
  })

  it('should not encrypt the given text', () => {
    jest.replaceProperty(config, 'encryptionEnabled', false)

    const actual = encryptData({data: 'text'})

    expect(actual).toStrictEqual({data: '{"data":"text"}'})
  })

  it('should decrypt the given text', () => {
    jest.replaceProperty(config, 'encryptionKey', 'encryptionKey'.padStart(32, '0'))
    jest.replaceProperty(config, 'encryptionEnabled', true)
    jest.replaceProperty(config, 'iv', Buffer.from('encryptionKeyencryptionKey').subarray(0, 16))

    const actual = decryptData('a+3Bp4F37eZXJxVb8Oy3')

    expect(actual).toStrictEqual({data: 'text'})
  })

  it('should decrypt the given invalid text', () => {
    jest.replaceProperty(config, 'encryptionKey', 'encryptionKey'.padStart(32, '0'))
    jest.replaceProperty(config, 'encryptionEnabled', true)
    jest.replaceProperty(config, 'iv', Buffer.from('encryptionKeyencryptionKey').subarray(0, 16))
    jest.spyOn(logger, 'error').mockImplementation()

    const actual = decryptData('a+3Bp4F37eZXJxVb8O3')

    expect(actual).toStrictEqual({text: 'a+3Bp4F37eZXJxVb8O3'})
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledWith(
      {
        data: {text: 'a+3Bp4F37eZXJxVb8O3'},
        error: new DecryptionError(),
        errorCode: 'LOGGING_DECRYPTION_ERROR',
        errorMessage: 'Failed to decrypt text, Kindly check your encryption string'
      },
      false
    )
  })

  it('should not decrypt the given text', () => {
    jest.replaceProperty(config, 'encryptionEnabled', false)

    const actual = decryptData('a+3Bp4F37eZXJxVb8Oy3')

    expect(actual).toStrictEqual({text: 'a+3Bp4F37eZXJxVb8Oy3'})
  })
})
