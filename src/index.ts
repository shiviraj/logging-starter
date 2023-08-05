import './extension/promise'
import * as logger from './logger'
import {decryptData, encryptData} from './crypto'

export * from './logger'
export * from './crypto'
export default {...logger, encryptData, decryptData}
