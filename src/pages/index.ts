import Category from './admin/category/category'
import Plan from './admin/plan/plan'
import Home from './client/home'
import Information from './client/information'
import Task from './client/task'
import Team from './client/team'

export const clientPages = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/information',
    element: Information
  },
  {
    path: '/task',
    element: Task
  },
  {
    path: '/team',
    element: Team
  },
  //admin
  {
    path: '/plan',
    element: Plan
  },
  {
    path: '/category',
    element: Category
  }
]

export const adminPages = []
