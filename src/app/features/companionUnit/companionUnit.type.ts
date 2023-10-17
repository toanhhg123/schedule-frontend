export interface CompanionUnit {
  _id: string
  name: string
}

export type CompanionUnitCreate = Omit<CompanionUnit, '_id'>
