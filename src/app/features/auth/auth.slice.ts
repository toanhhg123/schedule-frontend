import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AUTH_KEY_LOCAL, AuthRequest, AuthResponse, User } from './auth.type'
import LocalStorage from '@/utils/localstorage'

export type AuthStatus = 'PENDDING' | 'SUCCESS' | 'AUTHEN_FAILD'

const authencated = LocalStorage.getItem<AuthResponse>(AUTH_KEY_LOCAL)

export interface AuthState {
  status: AuthStatus
  data?: AuthResponse
}

const initialState: AuthState = {
  status: authencated ? 'PENDDING' : 'AUTHEN_FAILD'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sendRequestLogin: (_state, _action: PayloadAction<AuthRequest>) => {},
    getMe: () => {},
    getMeSuccess: (state, { payload }: PayloadAction<User>) => {
      state.status = 'SUCCESS'
      if (state.data)
        state.data = {
          ...state.data,
          ...payload
        }
    },

    loginSuccess: (state, _action: PayloadAction<AuthResponse>) => {
      LocalStorage.setItem(AUTH_KEY_LOCAL, _action.payload)
      state.status = 'SUCCESS'
      state.data = _action.payload
    },

    logout: (state) => {
      LocalStorage.removeItem(AUTH_KEY_LOCAL)
      state.status = 'AUTHEN_FAILD'
      state.data = undefined
    }
  }
})

export const { sendRequestLogin, loginSuccess, getMe, getMeSuccess, logout } = authSlice.actions

export default authSlice.reducer
