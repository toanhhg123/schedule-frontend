import API, { ResponseAPI } from '@/config/api.config'
import { OrganizaionUnit, OrganizationCreate } from './organizationUnit.type'

export const getAllOrganization = async () => {
  const { data } = await API.get<ResponseAPI<OrganizaionUnit[]>>('/api/organizational')
  return data.element
}

export const createOrganization = async (body: OrganizationCreate) => {
  const { data } = await API.post<ResponseAPI<OrganizaionUnit>>('/api/organizational', body)
  return data.element
}

export const updateOrganization = async (id: string, body: OrganizationCreate) => {
  const { data } = await API.patch<ResponseAPI<OrganizaionUnit>>(`/api/organizational/${id}`, body)
  return data.element
}

export const deleteOrganization = async (id: string) => {
  const { data } = await API.delete<ResponseAPI<OrganizaionUnit>>(`/api/organizational/${id}`)
  return data.element
}
