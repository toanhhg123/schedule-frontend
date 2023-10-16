import { Layout, theme } from 'antd'

const Group = () => {
  const { Content } = Layout
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <>
      <Content style={{ margin: '14px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
          <p>Group</p>
        </div>
      </Content>
    </>
  )
}

export default Group
