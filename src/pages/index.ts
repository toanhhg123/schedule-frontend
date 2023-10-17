import AdminHome from './admin/home'
import Home from './client/home'

export const clientPages = [
  {
    path: '/',
    element: Home
  }
]

export const adminPages = [
  {
    path: '/admin',
    element: AdminHome
  }
]
