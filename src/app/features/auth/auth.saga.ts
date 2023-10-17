import { PayloadAction } from '@reduxjs/toolkit'
import { call, takeLatest, put } from 'redux-saga/effects'
import { getMeRequest, loginRequest } from './auth.service'
import { getMe, getMeSuccess, loginFaild, loginSuccess, logout, sendRequestLogin } from './auth.slice'
import { AuthRequest, AuthResponse, User } from './auth.type'
import { ErrorAxios } from '@/config/api.config'

function* handleLoginSaga(action: PayloadAction<AuthRequest>) {
  try {
    const authResponse: AuthResponse = yield call(loginRequest, action.payload)
    yield put(loginSuccess(authResponse))
  } catch (error) {
    const e = error as ErrorAxios
    yield put(loginFaild(e.message))
  }
}

function* handleGetMe() {
  try {
    const authResponse: User = yield call(getMeRequest)
    yield put(getMeSuccess(authResponse))
  } catch (error) {
    yield put(logout())
  }
}

export default function* authSaga() {
  yield takeLatest(sendRequestLogin.type, handleLoginSaga)
  yield takeLatest(getMe.type, handleGetMe)
}
