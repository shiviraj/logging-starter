export interface LogInfo<D> {
  message: string
  data?: D
  additionalData?: D
  searchableFields?: D
}

export interface LogError<D> {
  errorCode?: string
  errorMessage: string
  error?: Error
  data?: D
  additionalData?: D
  searchableFields?: D
}

export interface LogRequest<D> extends LogInfo<D> {
  method: string
  url: string
}

export interface LogResponse<D> extends LogRequest<D> {
  statusCode: number
  responseData: D
  responseTime: number
}
