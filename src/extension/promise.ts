import index from '../logger'
import type {LogError, LogInfo} from '../types/logger'

export {}

declare global {
  interface Promise<T> {
    logOnSuccess<D extends Record<string, unknown>>(
      logInfo: LogInfo<D>,
      encryption?: boolean,
      logData?: boolean
    ): Promise<T>

    logOnError<D extends Record<string, unknown>>(logError: LogError<D>, encryption?: boolean): Promise<T>
  }
}

Promise.prototype.logOnSuccess = function <T, D extends Record<string, unknown>>(
  this: Promise<T>,
  logInfo: LogInfo<D>,
  encryption = true,
  logData = true
): Promise<T> {
  const {message, data, additionalData, searchableFields} = logInfo
  return this.then((parameter: T) => {
    index.info({message, data: logData ? {parameter} : data, additionalData, searchableFields}, encryption)
    return parameter
  })
}

Promise.prototype.logOnError = function <T, D extends Record<string, unknown>>(
  this: Promise<T>,
  logError: LogError<D>,
  encryption = true
): Promise<T> {
  const {errorCode, errorMessage, data, additionalData, searchableFields} = logError
  return this.catch((error: Error) => {
    index.error({errorCode, errorMessage, error, data, additionalData, searchableFields}, encryption)
    throw error
  })
}
