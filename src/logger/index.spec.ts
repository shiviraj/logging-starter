import logger from './index'
import * as crypto from '../crypto'
import DecryptionError from '../errors/decryptionError'

describe('Logger test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it('should log info', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(crypto, 'encryptData').mockReturnValue({data: 'data'})
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.info({message: 'message', data: {text: 'text'}})

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"message","data":"data","label":"INFO"}'
    )
    expect(crypto.encryptData).toHaveBeenCalledTimes(1)
    expect(crypto.encryptData).toHaveBeenCalledWith({text: 'text'})
  })

  it('should log info with circular dependency', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(crypto, 'encryptData').mockReturnValue({data: 'data'})
    jest.useFakeTimers({now: new Date('2023-01-01')})

    const obj: any = {}
    obj.circularRef = obj

    logger.info({message: 'success', data: {text: 'text'}, additionalData: obj})

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"success","data":"data","additionalData":{"circularRef":"[Circular]"},"label":"INFO"}'
    )
    expect(crypto.encryptData).toHaveBeenCalledTimes(1)
    expect(crypto.encryptData).toHaveBeenCalledWith({text: 'text'})
  })

  it('should log info without encryption', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.info({message: 'message', data: {text: 'text'}}, false)

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"message","data":{"text":"text"},"label":"INFO"}'
    )
  })

  it('should log error', () => {
    jest.spyOn(console, 'error').mockImplementation()
    jest.spyOn(crypto, 'encryptData').mockReturnValue({data: 'data'})
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.error({errorMessage: 'message', data: {text: 'text'}, error: new DecryptionError()})

    expect(console.error).toHaveBeenCalledTimes(1)
    expect(crypto.encryptData).toHaveBeenCalledTimes(1)
    expect(crypto.encryptData).toHaveBeenCalledWith({text: 'text'})
  })

  it('should log error without encryption', () => {
    jest.spyOn(console, 'error').mockImplementation()
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.error({errorMessage: 'message', data: {text: 'text'}}, false)

    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","errorMessage":"message","data":{"text":"text"},"error":{},"label":"ERROR"}'
    )
  })

  it('should log request', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(crypto, 'encryptData').mockReturnValue({data: 'data'})
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.request({message: 'message', method: 'post', url: '/', data: {text: 'text'}})

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"message","method":"post","url":"/","data":"data","label":"API_REQUEST"}'
    )
    expect(crypto.encryptData).toHaveBeenCalledTimes(1)
    expect(crypto.encryptData).toHaveBeenCalledWith({text: 'text'})
  })

  it('should log request without encryption', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.request({message: 'message', method: 'post', url: '/', data: {text: 'text'}}, false)

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"message","method":"post","url":"/","data":{"text":"text"},"label":"API_REQUEST"}'
    )
  })

  it('should log response', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(crypto, 'encryptData').mockReturnValue({data: 'data'})
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.response({
      statusCode: 200,
      message: 'message',
      responseData: '',
      method: 'post',
      url: '/',
      data: {text: 'text'}
    })

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"message","method":"post","url":"/","statusCode":200,"data":"data","label":"API_RESPONSE"}'
    )
    expect(crypto.encryptData).toHaveBeenCalledTimes(1)
    expect(crypto.encryptData).toHaveBeenCalledWith({data: {text: 'text'}, responseData: ''})
  })

  it('should log response without encryption', () => {
    jest.spyOn(console, 'log').mockImplementation()
    jest.useFakeTimers({now: new Date('2023-01-01')})

    logger.response(
      {
        statusCode: 200,
        message: 'message',
        responseData: '',
        method: 'post',
        url: '/',
        data: {text: 'text'}
      },
      false
    )

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith(
      '{"timeStamp":"2023-01-01T00:00:00.000Z","message":"message","method":"post","url":"/","statusCode":200,"responseData":"","data":{"text":"text"},"label":"API_RESPONSE"}'
    )
  })
})
