import { ReactNode, useState } from 'react'
import {
  TeamOutlined,
  UserOutlined,
  FundOutlined,
  CarryOutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'

interface Props {
  content: ReactNode
}

const Content = ({ content }: Props) => {
  const { Header, Sider } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          borderRight: '1px solid rgba(5, 5, 5, 0.06)'
        }}
        theme='light'
        width={280}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className='demo-logo-vertical' />
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FundOutlined />,
              label: 'Dashboard'
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Information'
            },
            {
              key: '3',
              icon: <CarryOutOutlined />,
              label: 'Task'
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'Team'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
            boxShadow: '0 .5px 6px 0 #ccc',
            position: 'fixed',
            top: 0,
            left: collapsed ? 81 : 281,
            width: '100%',
            transition: '.1s all ease'
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          Header
        </Header>
        {content}
      </Layout>
    </Layout>
  )
}

export default Content
