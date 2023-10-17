import Layout from '@/components/layout'
import { Table, Progress, Space, Modal, Button, Cascader, DatePicker, Form, Select, Input } from 'antd'
import { DataType, columns, conicColors, optionStatus } from './plan.type.ts'
import { useState } from 'react'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}
const Plan = () => {
  const { TextArea } = Input
  const { RangePicker } = DatePicker
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const onChange = (value: string) => {
    return console.log(value)
  }
  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
        <Space>
          <Cascader
            style={{ width: 400, margin: '0 8px' }}
            options={options}
            onChange={onChange}
            placeholder='Please select category...'
          />
          <Cascader
            style={{ width: 200, height: 'fit-content', margin: '0 8px' }}
            options={optionStatus}
            onChange={onChange}
            placeholder='Status....'
          />
        </Space>
        <Space>
          <Button type='primary' icon={null} size='large' onClick={showModal}>
            Add New
          </Button>
          <Modal
            title='New plan'
            open={open}
            width={1000}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout='horizontal'
              initialValues={{ size: 'default' }}
              size={'middle'}
              style={{ width: '100%' }}
            >
              <Form.Item label='Title Plan'>
                <Input />
              </Form.Item>
              <Form.Item label='Content'>
                <TextArea rows={8} />
              </Form.Item>
              <Form.Item label='Support'>
                <Select>
                  <Select.Option value='demo'>Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Maneger'>
                <Select>
                  <Select.Option value='demo'>Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Deadline'>
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} />
    </Layout>
  )
}

export default Plan

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: []
      }
    ]
  },
  {
    value: 'xihu',
    label: 'West Lake'
  }
]

const data: DataType[] = [
  {
    key: '1',
    plan: 'John Brown',
    deadline: 32,
    progress: <Progress type='dashboard' percent={14} strokeColor={conicColors} />
  },
  {
    key: '2',
    plan: 'Jim Green',
    deadline: 42,
    progress: <Progress type='dashboard' percent={49} strokeColor={conicColors} />
  },
  {
    key: '3',
    plan: 'Joe Black',
    deadline: 32,
    progress: <Progress type='dashboard' percent={100} strokeColor={conicColors} />
  }
]
