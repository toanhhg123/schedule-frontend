import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AUTH_KEY_LOCAL, AuthRequest, AuthResponse, User } from './auth.type'
import LocalStorage from '@/utils/localstorage'

export type AuthStatus = 'PENDDING' | 'SUCCESS' | 'AUTHEN_FAILD'

const authencated = LocalStorage.getItem<AuthResponse>(AUTH_KEY_LOCAL)

export interface AuthState {
  status: AuthStatus
  data?: AuthResponse
  loading?: boolean
  error?: string
}

const initialState: AuthState = {
  status: authencated ? 'PENDDING' : 'AUTHEN_FAILD'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sendRequestLogin: (_state, _action: PayloadAction<AuthRequest>) => {
      _state.loading = true
    },
    getMe: () => {},
    getMeSuccess: (state, { payload }: PayloadAction<User>) => {
      state.status = 'SUCCESS'
      state.loading = false

      if (state.data)
        state.data = {
          ...state.data,
          ...payload
        }
    },

    loginSuccess: (state, _action: PayloadAction<AuthResponse>) => {
      state.loading = false
      LocalStorage.setItem(AUTH_KEY_LOCAL, _action.payload)
      state.status = 'SUCCESS'
      state.data = _action.payload
    },

    loginFaild: (state, _action: PayloadAction<string>) => {
      state.loading = false
      state.error = _action.payload
    },

    logout: (state) => {
      state.loading = false
      LocalStorage.removeItem(AUTH_KEY_LOCAL)
      state.status = 'AUTHEN_FAILD'
      state.data = undefined
    },
    resetState: () => {
      return { ...initialState }
    }
  }
})

export const { sendRequestLogin, loginSuccess, getMe, getMeSuccess, logout, loginFaild, resetState } = authSlice.actions

export default authSlice.reducer
