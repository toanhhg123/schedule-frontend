import API, { ResponseAPI } from '@/config/api.config'
import { CompanionUnit, CompanionUnitCreate } from './companionUnit.type'

export const getAllCompanionUnit = async () => {
  const { data } = await API.get<ResponseAPI<CompanionUnit[]>>('/api/companionUnit')
  return data.element
}

export const createCompanionUnit = async (body: CompanionUnitCreate) => {
  const { data } = await API.post<ResponseAPI<CompanionUnit>>('/api/companionUnit', body)
  return data.element
}

export const updateCompanionUnit = async (id: string, body: CompanionUnitCreate) => {
  const { data } = await API.patch<ResponseAPI<CompanionUnit>>(`/api/companionUnit/${id}`, body)
  return data.element
}

export const deleteCompanionUnit = async (id: string) => {
  const { data } = await API.delete<ResponseAPI<CompanionUnit>>(`/api/companionUnit/${id}`)
  return data.element
}
