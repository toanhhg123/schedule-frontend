import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { CompanionUnit, CompanionUnitCreate } from './companionUnit.type'

type ErrorState = {
  type: 'GET' | 'POST' | 'DELETE' | 'PATCH'
  message: string
}

export interface CompanionUnitState {
  loading: boolean
  data?: CompanionUnit[]
  error?: ErrorState
  successMessage?: string
}

const initialState: CompanionUnitState = {
  loading: false
}

export const companionUnitSlice = createSlice({
  name: 'companionUnit',
  initialState,
  reducers: {
    sendRequest: (_state) => {
      _state.loading = true
      _state.successMessage = ''
    },
    sendRequestCreate: (_state, _action: PayloadAction<CompanionUnitCreate>) => {
      _state.loading = true
    },
    sendRequestUpdate: (_state, _action: PayloadAction<CompanionUnitCreate & { id: string }>) => {
      _state.loading = true
    },
    sendRequestDelete: (_state, _action: PayloadAction<string>) => {
      _state.loading = true
    },

    getSuccess: (state, { payload }: PayloadAction<CompanionUnit[]>) => {
      state.data = payload
      state.loading = false
      state.error = undefined
    },

    createSuccess: (state, { payload }: PayloadAction<string>) => {
      state.successMessage = payload
      state.loading = false
      state.error = undefined
      state.successMessage = 'created success'
    },

    faild: (state, { payload }: PayloadAction<ErrorState>) => {
      state.error = payload
      state.loading = false
    },

    resetState: () => {
      return { ...initialState }
    }
  }
})

export const {
  sendRequest,
  createSuccess,
  getSuccess,
  resetState,
  sendRequestCreate,
  sendRequestDelete,
  sendRequestUpdate,
  faild
} = companionUnitSlice.actions

export default companionUnitSlice.reducer
