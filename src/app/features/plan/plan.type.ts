export interface Plan {
  id: string
  title: string
  content: string
  timeStart: string
  organizationalId: string
  companionUnitId: string
}

export type PlanCreate = Omit<Plan, 'id'>
