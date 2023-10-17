import { getAllPlan } from '@/app/features/plan/plan.service'
import { Plan } from '@/app/features/plan/plan.type'
import Layout from '@/components/layout'
import { Table, message } from 'antd'
import { useEffect, useState } from 'react'

const Plan = () => {
  const [plans, setPlans] = useState<Plan[]>([])

  const getInitPlan = () => {
    message.loading({ type: 'loading', content: 'Action in progress..' })
    getAllPlan().then((data) => {
      setPlans(data)
      message.destroy()
    })
  }

  useEffect(() => {
    getInitPlan()
  }, [])

  return (
    <Layout>
      <Table dataSource={plans} />
    </Layout>
  )
}

export default Plan
