import API, { ResponseAPI } from '@/config/api.config'
import { AuthRequest, AuthResponse, User } from './auth.type'

export const loginRequest = async (authRequest: AuthRequest) => {
  const { data } = await API.post<ResponseAPI<AuthResponse>>('/api/auth/login', authRequest)
  return data.element
}

export const getMeRequest = async () => {
  const { data } = await API.get<ResponseAPI<User>>('/api/auth/me')
  return data.element
}
