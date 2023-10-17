import { resetState, sendRequestLogin } from '@/app/features/auth/auth.slice'
import { AuthRequest } from '@/app/features/auth/auth.type'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Alert, Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const onFinishFailed = (errorInfo: unknown) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  email?: string
  password?: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const { status, loading, error } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const onFinish = ({ email, password }: AuthRequest) => {
    try {
      dispatch(resetState())
      dispatch(
        sendRequestLogin({
          email,
          password
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status !== 'AUTHEN_FAILD') {
      navigate('/admin')
    }
  }, [status, navigate])

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      {error && <Alert message={error} style={{ marginBottom: 10 }} type='error' showIcon />}
      <Form.Item<FieldType>
        label='email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
