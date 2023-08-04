import {encryptData} from "../crypto";
import type {LogError, LogInfo, LogRequest, LogResponse} from "../types/logger";

const logInfo = <T extends Record<string, unknown>>(data: T): void => {
  console.log(JSON.stringify(data));
};

const logError = <T extends Record<string, unknown>>(data: T): void => {
  console.error(JSON.stringify(data));
};

const getTimeStamp = () => new Date().toJSON();

const request = <D extends Record<string, unknown>>(logRequest: LogRequest<D>, encryption: boolean = true): void => {
  const {message, method, url, data, additionalData, searchableFields} = logRequest;
  const cryptoData = encryption ? encryptData(data) : {data};
  logInfo({
    timeStamp: getTimeStamp(),
    message,
    method,
    url,
    ...cryptoData,
    additionalData,
    searchableFields,
    label: "API_REQUEST"
  });
};

const response = <D extends Record<string, unknown>>(logResponse: LogResponse<D>, encryption: boolean = true): void => {
  const {message, method, url, searchableFields, data, responseData, responseTime, additionalData, statusCode} =
    logResponse;
  const cryptoData = encryption ? encryptData({responseData, data}) : {responseData, data};
  logInfo({
    timeStamp: getTimeStamp(),
    message,
    method,
    url,
    statusCode,
    ...cryptoData,
    searchableFields,
    additionalData,
    responseTime,
    label: "API_RESPONSE"
  });
};

const info = <D extends Record<string, unknown>>(info: LogInfo<D>, encryption = true): void => {
  const {message, data, additionalData, searchableFields} = info;
  const cryptoData = encryption ? encryptData(data) : {data};
  logInfo({
    timeStamp: getTimeStamp(),
    message,
    ...cryptoData,
    additionalData,
    searchableFields,
    label: "INFO"
  });
};

const error = <D extends Record<string, unknown>>(error: LogError<D>, encryption = true): void => {
  const {errorCode, errorMessage, error: errorStack, data, additionalData, searchableFields} = error;
  const cryptoData = encryption ? encryptData(data) : {data};
  logError({
    timeStamp: getTimeStamp(),
    errorCode,
    errorMessage,
    ...cryptoData,
    additionalData,
    searchableFields,
    error: {name: errorStack?.name, message: errorStack?.message, stack: errorStack?.stack},
    label: "ERROR"
  });
};

const index = {info, error, request, response};
export default index;
export {info, error, request, response};