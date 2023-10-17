import { all } from 'redux-saga/effects'
import authSaga from './features/auth/auth.saga'

function* rootSaga() {
  yield all([authSaga()])
}

export default rootSaga
