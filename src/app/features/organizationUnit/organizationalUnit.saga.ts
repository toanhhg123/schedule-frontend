import { call, put, takeLatest } from 'redux-saga/effects'
import {
  createOrganization,
  deleteOrganization,
  getAllOrganization,
  updateOrganization
} from './organizationalUnit.service'
import {
  getSuccess,
  sendRequest,
  sendRequestCreate,
  sendRequestDelete,
  sendRequestUpdate
} from './organizationalUnit.slice'
import { OrganizaionUnit, OrganizationCreate } from './organizationUnit.type'
import { message } from 'antd'
import { ErrorAxios } from '@/config/api.config'
import { PayloadAction } from '@reduxjs/toolkit'

function* handleGetOrganizational() {
  try {
    const data: OrganizaionUnit[] = yield call(getAllOrganization)
    yield put(getSuccess(data))
  } catch (error) {
    const e = error as ErrorAxios
    message.error(e.message)
  }
}

function* handleCreate(action: PayloadAction<OrganizationCreate>) {
  try {
    yield call(createOrganization, action.payload)
    yield put({ type: sendRequest.type })
    message.success('create success')
  } catch (error) {
    const e = error as ErrorAxios
    message.error(e.message)
  }
}

function* handleUpdate(action: PayloadAction<OrganizationCreate & { id: string }>) {
  try {
    yield call(updateOrganization, action.payload.id, { name: action.payload.name })
    yield put({ type: sendRequest.type })
    message.success('update success')
  } catch (error) {
    const e = error as ErrorAxios
    message.error(e.message)
  }
}

function* handleDelete(action: PayloadAction<string>) {
  try {
    yield call(deleteOrganization, action.payload)
    yield put({ type: sendRequest.type })
    message.success('delete successs')
  } catch (error) {
    const e = error as ErrorAxios
    message.error(e.message)
  }
}

export default function* OrganizationalSaga() {
  yield takeLatest(sendRequest.type, handleGetOrganizational)
  yield takeLatest(sendRequestCreate.type, handleCreate)
  yield takeLatest(sendRequestUpdate.type, handleUpdate)
  yield takeLatest(sendRequestDelete.type, handleDelete)
}
