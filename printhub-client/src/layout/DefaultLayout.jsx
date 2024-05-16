import { Layout } from 'antd';
import { Outlet} from "react-router-dom";
import AppHeader from '../components/common/header/header';
import AppFooter from '../components/common/footer/footer';
const {Header,Content,Footer } = Layout;

function DefaultLayout() {
  return (
    <Layout className='mainLayout'>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <AppHeader/>
      </Header>
      
      <Content>
        <Outlet/>
      </Content>

      <Footer>
        <AppFooter/>
      </Footer>
    </Layout>
  );
}

export default DefaultLayout;
