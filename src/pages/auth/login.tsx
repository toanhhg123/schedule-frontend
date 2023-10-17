import { sendRequestLogin } from '@/app/features/auth/auth.slice'
import { AuthRequest } from '@/app/features/auth/auth.type'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const onFinishFailed = (errorInfo: unknown) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const onFinish = (_values: AuthRequest) => {
    try {
      dispatch(
        sendRequestLogin({
          email: 'admin@gmail.com',
          password: '1234567'
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
      <Form.Item<FieldType>
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
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
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
