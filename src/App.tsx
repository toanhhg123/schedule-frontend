import DashBoard from '@/pages/client/DashBoard'
import Layout from '@/components/LayoutClient/Content'

const App = () => {
  return (
    <>
      <Layout content={<DashBoard />} />
    </>
  )
}

export default App
