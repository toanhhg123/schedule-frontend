import { ErrorAxios } from '@/config/api.config'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  createCompanionUnit,
  deleteCompanionUnit,
  getAllCompanionUnit,
  updateCompanionUnit
} from './companionUnit.service'
import {
  faild,
  getSuccess,
  sendRequest,
  sendRequestCreate,
  sendRequestDelete,
  sendRequestUpdate
} from './companionUnit.slice'
import { CompanionUnit, CompanionUnitCreate } from './companionUnit.type'
import { message } from 'antd'

function* handleGetCompanionUnit() {
  try {
    console.log('running')
    const companionUnits: CompanionUnit[] = yield call(getAllCompanionUnit)
    yield put(getSuccess(companionUnits))
  } catch (error) {
    const e = error as ErrorAxios
    yield put(
      faild({
        type: 'GET',
        message: e.message
      })
    )
  }
}

function* handleCreate(action: PayloadAction<CompanionUnitCreate>) {
  try {
    yield call(createCompanionUnit, action.payload)
    yield put({ type: sendRequest.type })
    message.success('create success')
  } catch (error) {
    const e = error as ErrorAxios
    yield put(
      faild({
        type: 'POST',
        message: e.message
      })
    )
  }
}

function* handleUpdate(action: PayloadAction<CompanionUnitCreate & { id: string }>) {
  try {
    yield call(updateCompanionUnit, action.payload.id, { name: action.payload.name })
    yield put({ type: sendRequest.type })
    message.success('update success')
  } catch (error) {
    const e = error as ErrorAxios
    yield put(
      faild({
        type: 'PATCH',
        message: e.message
      })
    )
  }
}

function* handleDelete(action: PayloadAction<string>) {
  try {
    yield call(deleteCompanionUnit, action.payload)
    yield put({ type: sendRequest.type })
    message.success('delete successs')
  } catch (error) {
    const e = error as ErrorAxios
    yield put(
      faild({
        type: 'DELETE',
        message: e.message
      })
    )
  }
}

export default function* companionUnitSaga() {
  yield takeLatest(sendRequest.type, handleGetCompanionUnit)
  yield takeLatest(sendRequestCreate.type, handleCreate)
  yield takeLatest(sendRequestUpdate.type, handleUpdate)
  yield takeLatest(sendRequestDelete.type, handleDelete)
}
