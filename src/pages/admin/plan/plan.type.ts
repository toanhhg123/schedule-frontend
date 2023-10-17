import { ReactNode } from 'react'
import type { ColumnsType } from 'antd/es/table'

export interface DataType {
  key: string
  plan: string
  content: string
  maneger: string
  support: string
  deadline: number
  progress: ReactNode
}

export const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan'
  },
  {
    title: 'content',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: 'Maneger',
    dataIndex: 'maneger',
    key: 'maneger'
  },
  {
    title: 'Support',
    dataIndex: 'support',
    key: 'support'
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline'
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress'
  }
]

export const conicColors = { '0%': '#FF4D4F', '50%': '#ffe58f', '100%': '#87d068' }

export const optionStatus: Option[] = [
  {
    value: 0,
    label: 'Incomplete'
  },
  {
    value: 50,
    label: 'In progress'
  },
  {
    value: 100,
    label: 'Completed'
  }
]
