import index from '../logger'
import type {LogError, LogInfo} from '../types/logger'

export {}

declare global {
  interface Promise<T> {
    logOnSuccess(logInfo: LogInfo, encryption?: boolean, logData?: boolean): Promise<T>

    logOnError(logError: LogError, encryption?: boolean): Promise<T>
  }
}

Promise.prototype.logOnSuccess = function <T>(
  this: Promise<T>,
  logInfo: LogInfo,
  encryption = true,
  logData = true
): Promise<T> {
  const {message, data, additionalData, searchableFields} = logInfo
  return this.then((parameter: T) => {
    index.info({message, data: logData ? {parameter} : data, additionalData, searchableFields}, encryption)
    return parameter
  })
}

Promise.prototype.logOnError = function <T>(this: Promise<T>, logError: LogError, encryption = true): Promise<T> {
  const {errorCode, errorMessage, data, additionalData, searchableFields} = logError
  return this.catch((error: Error) => {
    index.error({errorCode, errorMessage, error, data, additionalData, searchableFields}, encryption)
    throw error
  })
}
