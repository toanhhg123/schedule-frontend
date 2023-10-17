import {
  sendRequest,
  sendRequestCreate,
  sendRequestDelete,
  sendRequestUpdate
} from '@/app/features/organizationUnit/organizationalUnit.slice'
import { OrganizaionUnit, OrganizationCreate } from '@/app/features/organizationUnit/organizationUnit.type'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Layout from '@/components/layout'
import { Button, Form, Input, Modal, Space, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

const OrganizationalUnitPage = () => {
  const { data, loading } = useAppSelector((state) => state.organizational)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState<{
    type?: 'create' | 'update'
    curData?: OrganizaionUnit
  }>({})
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      await form.validateFields()

      const dataForm = form.getFieldsValue() as OrganizationCreate
      if (show.type === 'create') {
        dispatch(sendRequestCreate(dataForm))
      }

      if (show.type === 'update' && show.curData) {
        dispatch(sendRequestUpdate({ ...dataForm, id: show.curData?.id }))
      }

      setShow({})
    } catch (error) {
      message.error('error')
    }
  }

  function handleDelete(record: OrganizaionUnit): void {
    dispatch(sendRequestDelete(record.id))
  }

  useEffect(() => {
    dispatch(sendRequest())
  }, [dispatch])

  const columns: ColumnsType<OrganizaionUnit> = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              setShow({ type: 'update', curData: record })
              form.setFieldsValue({ name: record.name })
            }}
          >
            update
          </Button>
          <Button onClick={() => handleDelete(record)} danger>
            delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <Layout
      content={
        <>
          <Modal onOk={handleOk} open={show.type ? true : false} onCancel={() => setShow({})}>
            <Form form={form} name='basic' initialValues={{ remember: true }} autoComplete='off'>
              <Form.Item<OrganizationCreate>
                label='name'
                name='name'
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Button
            type='primary'
            onClick={() => {
              setShow({
                type: 'create'
              })
              form.setFieldsValue({
                name: ''
              })
            }}
          >
            create
          </Button>
          <Table columns={columns} dataSource={data} loading={loading} />
        </>
      }
    />
  )
}

export default OrganizationalUnitPage
