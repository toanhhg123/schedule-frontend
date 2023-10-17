import { all } from 'redux-saga/effects'
import authSaga from './features/auth/auth.saga'
import companionUnitSaga from './features/companionUnit/companionUnit.saga'
import OrganizationalSaga from './features/organizationUnit/organizationalUnit.saga'

function* rootSaga() {
  yield all([authSaga(), companionUnitSaga(), OrganizationalSaga()])
}

export default rootSaga
