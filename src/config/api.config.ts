import { AUTH_KEY_LOCAL, AuthResponse } from '@/app/features/auth/auth.type'
import LocalStorage from '@/utils/localstorage'
import axios from 'axios'

export type ResponseAPI<T> = {
  status: string
  message: string
  element: T
}
const API = axios.create({
  baseURL: 'http://localhost:8080'
})

API.interceptors.request.use(
  (config) => {
    try {
      const authLocal = LocalStorage.getItem<AuthResponse>(AUTH_KEY_LOCAL)
      if (authLocal) {
        const token = authLocal.jwt
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.log(error)
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default API
