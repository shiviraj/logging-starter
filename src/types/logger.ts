export interface LogInfo {
  message: string
  data?: Record<string, unknown>
  additionalData?: Record<string, unknown>
  searchableFields?: Record<string, unknown>
}

export interface LogError {
  errorCode?: string
  errorMessage: string
  error?: Error
  data?: Record<string, unknown>
  additionalData?: Record<string, unknown>
  searchableFields?: Record<string, unknown>
}

export interface PromiseLogInfo extends LogInfo {
  skipLoggingArgument?: boolean
  encryption?: boolean
}

export interface PromiseLogError extends LogError {
  encryption?: boolean
}

export interface LogRequest extends LogInfo {
  method: string
  url: string
}

export interface LogResponse extends LogRequest {
  statusCode: number
  responseData?: any
  responseTime?: number
}
