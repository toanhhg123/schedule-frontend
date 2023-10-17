import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { CompanionUnit, CompanionUnitCreate } from './companionUnit.type'

export interface CompanionUnitState {
  loading: boolean
  data?: CompanionUnit[]
  error?: {
    type: 'GET' | 'POST' | 'DELETE' | 'PATCH'
    message: string
  }
  successMessage?: string
}

const initialState: CompanionUnitState = {
  loading: false
}

export const companionUnitSlice = createSlice({
  name: 'companionUnit',
  initialState,
  reducers: {
    sendRequest: (_state, _action?: PayloadAction<CompanionUnitCreate>) => {
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
    },

    resetState: () => {
      return { ...initialState }
    }
  }
})
