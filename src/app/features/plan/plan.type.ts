export interface Plan {
  id: string
  title: string
  content: string
  timeStart: Date
  organizationalId: string
  companionUnitId: string
}

export interface Work {
  id: string
  planId: string
  wokingItem: string
}

export type WorkCreate = Omit<Work, 'id'>

export type PlanCreate = Omit<Plan, 'id'>
