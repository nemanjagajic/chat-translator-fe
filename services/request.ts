import axios, {
  AxiosDefaults,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  HeadersDefaults,
  ResponseType
} from 'axios'

export const BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL

const IS_SERVER = typeof window === 'undefined'

const defaultConfig = {
  baseURL: BASE_API_ENDPOINT || '',
  responseType: 'json' as ResponseType
}

export const attachHeaders = (instance: AxiosInstance, headers: AxiosRequestHeaders) => {
  Object.keys(headers).forEach((key: string) => {
    // @ts-ignore
    instance.defaults.headers[key] = headers[key]
  })
}

const request = (config: AxiosRequestConfig = defaultConfig) => {
  const instance = axios.create(config)
  const token = !IS_SERVER && localStorage.getItem('token')
  const headers = {
    accept: 'application/json',
    authorization: ''
  }
  if (token) headers.authorization = token
  attachHeaders(instance, headers)
  return instance
}

export default request()