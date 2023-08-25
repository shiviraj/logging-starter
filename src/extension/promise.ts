import index from '../logger'
import type {PromiseLogError, PromiseLogInfo} from '../types/logger'

export {}

declare global {
  interface Promise<T> {
    logOnSuccess(logInfo: PromiseLogInfo): Promise<T>

    logOnError(logError: PromiseLogError): Promise<T>
  }
}

Promise.prototype.logOnSuccess = function <T>(this: Promise<T>, logInfo: PromiseLogInfo): Promise<T> {
  const {message, data, additionalData, searchableFields, encryption = true, skipLoggingArgument = false} = logInfo
  return this.then((argument: T) => {
    index.info(
      {
        message,
        data: skipLoggingArgument ? data : {argument, data},
        additionalData,
        searchableFields
      },
      encryption
    )
    return argument
  })
}

Promise.prototype.logOnError = function <T>(this: Promise<T>, logError: PromiseLogError): Promise<T> {
  const {errorCode, errorMessage, data, additionalData, searchableFields, encryption = true} = logError
  return this.catch((error: Error) => {
    index.error({errorCode, errorMessage, error, data, additionalData, searchableFields}, encryption)
    throw error
  })
}
