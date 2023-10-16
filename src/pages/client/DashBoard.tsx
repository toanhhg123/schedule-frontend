import { Layout, theme } from 'antd'

const DashBoard = () => {
  const { Content } = Layout
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <>
      <Content
        style={{
          padding: 0,
          margin: '16px 12px',
          marginTop: 72,
          background: colorBgContainer
        }}
      >
        <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
          <p>DashBoard</p>
        </div>
      </Content>
    </>
  )
}

export default DashBoard
