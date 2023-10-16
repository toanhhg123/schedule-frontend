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
  const { Header, Sider, Content } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout>
      <Sider theme='dark' width={280} trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1'
            },
            {
              key: '2',
              icon: <FundOutlined />,
              label: 'nav 2'
            },
            {
              key: '3',
              icon: <CarryOutOutlined />,
              label: 'nav 3'
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'nav 3'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Content
