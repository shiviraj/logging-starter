import logger from "../index";
import {LogError, LogInfo} from "../types/logger";

export {};

declare global {
  interface Promise<T> {
    logOnSuccess<D extends Record<string, unknown>>(logInfo: LogInfo<D>, logData: boolean, encryption?: boolean): Promise<T>;

    logOnError<D extends Record<string, unknown>>(logError: LogError<D>, encryption?: boolean): Promise<T>;
  }
}

Promise.prototype.logOnSuccess = function <T, D extends Record<string, unknown>>(this: Promise<T>, logInfo: LogInfo<D>, logData: boolean = true, encryption?: boolean): Promise<T> {
  const {message, data, additionalData, searchableFields} = logInfo;
  return this.then((parameter: T) => {
    logger.info({message, data: (logData ? {parameter} : data), additionalData, searchableFields}, encryption);
    return parameter;
  });
};

Promise.prototype.logOnError = function <T, D extends Record<string, unknown>>(this: Promise<T>, logError: LogError<D>, encryption?: boolean): Promise<T> {
  const {errorCode, errorMessage, data, additionalData, searchableFields} = logError;
  return this.catch((error: Error) => {
    logger.error({errorCode, errorMessage, error, data, additionalData, searchableFields}, encryption);
    throw error;
  });
};
