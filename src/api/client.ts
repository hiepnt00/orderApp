import axios, { AxiosInstance } from 'axios'
import type { AxiosRequestConfig } from 'axios'

const baseURL = (import.meta.env.VITE_API_BASE as string) || 'https://jsonplaceholder.typicode.com'

const client: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
})

client.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

client.interceptors.response.use(
  response => response,
  error => Promise.reject(error?.response || error)
)

export function setAuthToken(token: string | null) {
  if (token) client.defaults.headers.common.Authorization = `Bearer ${token}`
  else delete client.defaults.headers.common.Authorization
}

export default client

// Convenience wrappers for common HTTP methods returning `resp.data` directly.
export async function apiGet<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  const resp = await client.get<T>(url, { params, ...(config || {}) })
  return resp.data
}

export async function apiPost<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const resp = await client.post<T>(url, data, config)
  return resp.data
}

export async function apiPut<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const resp = await client.put<T>(url, data, config)
  return resp.data
}

export async function apiPatch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const resp = await client.patch<T>(url, data, config)
  return resp.data
}

export async function apiDelete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const resp = await client.delete<T>(url, config)
  return resp.data
}
