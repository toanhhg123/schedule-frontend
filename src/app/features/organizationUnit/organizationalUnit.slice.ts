import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { OrganizaionUnit, OrganizationCreate } from './organizationUnit.type'

export interface OrganizationalState {
  loading: boolean
  data?: OrganizaionUnit[]
}

const initialState: OrganizationalState = {
  loading: false
}

export const organizationalSlice = createSlice({
  name: 'organizational',
  initialState,
  reducers: {
    sendRequest: (_state) => {
      _state.loading = true
    },
    sendRequestCreate: (_state, _action: PayloadAction<OrganizationCreate>) => {
      _state.loading = true
    },
    sendRequestUpdate: (_state, _action: PayloadAction<OrganizationCreate & { id: string }>) => {
      _state.loading = true
    },
    sendRequestDelete: (_state, _action: PayloadAction<string>) => {
      _state.loading = true
    },

    getSuccess: (state, { payload }: PayloadAction<OrganizaionUnit[]>) => {
      state.data = payload
      state.loading = false
    },

    resetState: () => {
      return { ...initialState }
    }
  }
})

export const { sendRequest, resetState, sendRequestCreate, sendRequestDelete, sendRequestUpdate, getSuccess } =
  organizationalSlice.actions

export default organizationalSlice.reducer
