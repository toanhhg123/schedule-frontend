import {
  sendRequest,
  sendRequestCreate,
  sendRequestDelete,
  sendRequestUpdate
} from '@/app/features/companionUnit/companionUnit.slice'
import { CompanionUnit, CompanionUnitCreate } from '@/app/features/companionUnit/companionUnit.type'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Layout from '@/components/layout'
import { Button, Form, Input, Modal, Space, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'

const CompanionUnitPage = () => {
  const { data, loading } = useAppSelector((state) => state.companionUnit)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState<{
    type?: 'create' | 'update'
    curData?: CompanionUnit
  }>({})
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      await form.validateFields()

      const dataForm = form.getFieldsValue() as CompanionUnitCreate
      if (show.type === 'create') {
        dispatch(sendRequestCreate(dataForm))
      }

      if (show.type === 'update' && show.curData) {
        dispatch(sendRequestUpdate({ ...dataForm, id: show.curData?._id }))
      }

      setShow({})
    } catch (error) {
      message.error('error')
    }
  }

  function handleDelete(record: CompanionUnit): void {
    dispatch(sendRequestDelete(record._id))
  }

  useEffect(() => {
    dispatch(sendRequest())
  }, [dispatch])

  const columns: ColumnsType<CompanionUnit> = [
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
    <Layout>
      <Modal onOk={handleOk} open={show.type ? true : false} onCancel={() => setShow({})}>
        <Form form={form} name='basic' initialValues={{ remember: true }} autoComplete='off'>
          <Form.Item<CompanionUnitCreate>
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
      <Table rowKey={'_id'} key={'_id'} columns={columns} dataSource={data} loading={loading} />
    </Layout>
  )
}

export default CompanionUnitPage
