import { getMe } from '@/app/features/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ReactNode, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const PrivateRouter = ({ children }: Props) => {
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGetMeDispatch = useCallback(async () => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (status === 'PENDDING') {
      handleGetMeDispatch()
    }
    if (status === 'AUTHEN_FAILD') navigate('/auth/login', { replace: true })
  }, [dispatch, handleGetMeDispatch, navigate, status])

  return children
}

export default PrivateRouter
