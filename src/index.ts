import {error, info, request, response} from './logger'
import {decryptData, encryptData} from './crypto'
import './extension/promise'

export * from './logger'

const logger = {info, error, request, response, encryptData, decryptData}
export default logger
