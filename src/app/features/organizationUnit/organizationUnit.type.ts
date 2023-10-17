export interface OrganizaionUnit {
  id: string
  name: string
}

export type OrganizationCreate = Omit<OrganizaionUnit, 'id'>
