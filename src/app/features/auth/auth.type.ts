export const AUTH_KEY_LOCAL = '___AUTH____KEY____LOACAL_IDX'

export enum ERole {
  'ROLE_ADMIN',
  'ROLE_USER'
}

export type AuthRequest = {
  email: string
  password: string
}

export type User = {
  id: string
  userName: string
  email: string
  roles: ERole[]
}

export type AuthResponse = {
  jwt: string
  id: string
  email: string
  roles: ERole[]
}
