import { theme } from 'antd'

const DashBoard = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <>
      <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
        <p>DashBoard</p>
      </div>
    </>
  )
}

export default DashBoard
