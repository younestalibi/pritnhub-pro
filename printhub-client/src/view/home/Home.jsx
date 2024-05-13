import { Layout } from 'antd';
import AppHeader from '../../components/common/header/header';
import AppHero from './hero';
import AppFeature from './feature';
import AppFooter from '../../components/common/footer/footer';
import AppAbout from './about';
import AppService from './services';
import AppCategory from './category';
import AppTestimonial from './testimonial';

const {Header,Content,Footer } = Layout;

function Home() {
  return (
    <Layout className='mainLayout'>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <AppHeader/>
      </Header>
      
      <Content>
        <AppHero/>
        <AppFeature/>
        <AppAbout/>
        <AppCategory/>
        <AppService/>
        <AppTestimonial/>
      </Content>

      <Footer>
        <AppFooter/>
      </Footer>
    </Layout>
  );
}

export default Home;
