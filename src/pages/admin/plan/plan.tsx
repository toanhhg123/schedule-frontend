import { sendRequest } from '@/app/features/companionUnit/companionUnit.slice'
import { sendRequest as sendRequestOragnization } from '@/app/features/organizationUnit/organizationalUnit.slice'
import {
  createPlan,
  createWork,
  deletePlan,
  deleteWork,
  getAllPlan,
  getWorks,
  updatePlan
} from '@/app/features/plan/plan.service'
import { Plan, PlanCreate, Work, WorkCreate } from '@/app/features/plan/plan.type'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Layout from '@/components/layout'
import { Badge, Button, DatePicker, Form, Input, Modal, Select, Space, Table, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table'
import { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

const PlanPage = () => {
  const { data: organizationals } = useAppSelector((state) => state.organizational)
  const { data: companions } = useAppSelector((state) => state.companionUnit)
  const dispatch = useAppDispatch()
  const [plans, setPlans] = useState<Plan[]>([])
  const [works, setWorks] = useState<Work[]>([])
  const [show, setShow] = useState<{
    type?: 'create' | 'update' | 'createWork' | 'showWorks'
    curData?: Plan
  }>({})

  const [form] = useForm()

  function handleDelete(record: Plan): void {
    message.loading({ type: 'loading', content: 'Action in progress..' })
    deletePlan(record.id).then(() => {
      message.destroy()
      message.success('delete success')
      getInitPlan()
    })
  }

  const handleOk = async () => {
    try {
      await form.validateFields()

      const dataForm = form.getFieldsValue() as PlanCreate
      form.setFieldValue('timeStart', dayjs(form.getFieldValue('timeStart')))
      if (show.type === 'create') {
        await createPlan(dataForm)
        message.success('create plan success')
      }

      if (show.type === 'update' && show.curData) {
        await updatePlan(show.curData.id, dataForm)
        message.success('update plan success')
      }

      if (show.type === 'createWork' && show.curData) {
        const dataForm = form.getFieldsValue() as WorkCreate
        await createWork({ planId: show.curData.id, wokingItem: dataForm.wokingItem })
        message.success('create work success')
      }

      form.resetFields()
      getInitPlan()
      setShow({})
    } catch (error) {
      message.error('error')
    }
  }

  const handleDeleteWork = async (work: Work) => {
    message.loading({ type: 'loading', content: 'Action in progress..' })
    deleteWork(work.id).then(() => {
      message.destroy()
      message.success('delete success')
      getInitPlan()
    })
  }

  const getInitPlan = useCallback(() => {
    message.loading({ type: 'loading', content: 'Action in progress..' })
    dispatch(sendRequest())
    dispatch(sendRequestOragnization())

    getAllPlan().then((data) => {
      setPlans(data)
      message.destroy()
    })

    getWorks().then((data) => {
      setWorks(data)
      message.destroy()
    })
  }, [dispatch])

  useEffect(() => {
    getInitPlan()
  }, [getInitPlan])

  const columns: ColumnsType<Plan> = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'timeStart',
      dataIndex: 'timeStart',
      key: 'timeStart',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'organizational',
      dataIndex: 'organizational',
      key: 'organizational',
      render: (_, record) => {
        return (
          <Badge>
            {organizationals?.find((organizational) => organizational.id === record.organizationalId)?.name}
          </Badge>
        )
      }
    },

    {
      title: 'companization',
      dataIndex: 'companization',
      key: 'companization',
      render: (_, record) => {
        return <Badge>{companions?.find((companion) => companion._id === record.companionUnitId)?.name}</Badge>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            onClick={() => {
              setShow({ type: 'showWorks', curData: record })
              form.setFieldsValue(record)
              form.setFieldValue('timeStart', dayjs(record.timeStart))
            }}
          >
            Works
          </Button>
          <Button
            type='primary'
            onClick={() => {
              setShow({ type: 'createWork', curData: record })
              form.setFieldsValue(record)
              form.setFieldValue('timeStart', dayjs(record.timeStart))
            }}
          >
            Create Work
          </Button>
          <Button
            onClick={() => {
              setShow({ type: 'update', curData: record })
              form.setFieldsValue(record)
              form.setFieldValue('timeStart', dayjs(record.timeStart))
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

  const columnsWork: ColumnsType<Work> = [
    {
      title: 'workingItem',
      dataIndex: 'workingItem',
      key: 'workingItem',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              handleDeleteWork(record)
            }}
            danger
          >
            delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <Layout>
      <Button
        onClick={() => {
          setShow({ type: 'create' })
        }}
        type='primary'
      >
        create
      </Button>
      <Modal onOk={handleOk} open={show.type ? true : false} onCancel={() => setShow({})}>
        {['create', 'update'].includes(show.type || 'not found') && (
          <Form form={form} name='basic' initialValues={{ remember: true }} autoComplete='off'>
            <Form.Item<PlanCreate>
              label='title'
              name='title'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<PlanCreate>
              label='content'
              name='content'
              rules={[{ required: true, message: 'Please input your content!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<PlanCreate>
              label='Time Start'
              name='timeStart'
              rules={[{ required: true, message: 'Please choice Time Start!' }]}
            >
              <DatePicker format={'YYYY-MM-DD'} />
            </Form.Item>

            <Form.Item<PlanCreate>
              label='Companional'
              name='companionUnitId'
              rules={[{ required: true, message: 'Please choice Companional!' }]}
            >
              <Select options={companions?.map((x) => ({ value: x._id, label: x.name }))} />
            </Form.Item>

            <Form.Item<PlanCreate>
              label='organizational'
              name='organizationalId'
              rules={[{ required: true, message: 'Please choice organizational!' }]}
            >
              <Select options={organizationals?.map((x) => ({ value: x.id, label: x.name }))} />
            </Form.Item>
          </Form>
        )}

        {show.type === 'createWork' && (
          <Form form={form} name='basic' initialValues={{ remember: true }} autoComplete='off'>
            <Form.Item<WorkCreate>
              label='Work Item'
              name='wokingItem'
              rules={[{ required: true, message: 'Please input your work!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}

        {show.type === 'showWorks' && show.curData && (
          <Table
            rowKey={'id'}
            key={'id'}
            columns={columnsWork}
            dataSource={works.filter((x) => x.planId === show.curData?.id)}
          />
        )}
      </Modal>
      <Table rowKey={'id'} key={'id'} columns={columns} dataSource={plans} />
    </Layout>
  )
}

export default PlanPage
