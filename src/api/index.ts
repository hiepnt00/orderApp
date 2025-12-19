import type { AxiosRequestConfig } from 'axios'
import client from './client'

/**
 * Standardized API result so callers don't need try/catch.
 * - ok: indicates success
 * - data: response payload when ok
 * - error: normalized error when not ok
 */
export type ApiResult<T = any> =
  | { ok: true; data: T; status?: number }
  | { ok: false; data: null; error: any; status?: number }

async function callApi<T = any>(config: AxiosRequestConfig): Promise<ApiResult<T>> {
  try {
    const resp = await client.request<T>(config)
    return { ok: true, data: (resp as any).data, status: (resp as any).status }
  } catch (err: any) {
    const status = err?.status || err?.statusCode || err?.response?.status
    const errorPayload = err?.data ?? err?.response?.data ?? err?.message ?? err
    return { ok: false, data: null, error: errorPayload, status }
  }
}

export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
  callApi<T>({ method: 'GET', url, params, ...(config || {}) })

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  callApi<T>({ method: 'POST', url, data, ...(config || {}) })

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  callApi<T>({ method: 'PUT', url, data, ...(config || {}) })

export const patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  callApi<T>({ method: 'PATCH', url, data, ...(config || {}) })

export const del = <T = any>(url: string, config?: AxiosRequestConfig) =>
  callApi<T>({ method: 'DELETE', url, ...(config || {}) })

const api = { get, post, put, patch, del, axiosInstance: client }
export default api

