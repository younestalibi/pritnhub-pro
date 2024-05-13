import { Layout } from 'antd';
import AppHeader from '../common/header/header';
import AppFooter from '../common/footer/footer';


const {Header,Content,Footer } = Layout;
export default function ProductList(){
        return (
        <Layout className='mainLayout'>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
            <AppHeader/>
          </Header>
          
          <Content>
            <h1>products list</h1>
          </Content>

          {/* <Footer>
              <AppFooter/>
          </Footer> */}
        </Layout>
        );
}