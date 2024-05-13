import { Col, Row } from 'antd';
import image1 from '../../assets/images/about.jpg';

export default function AppAbout(){

    return (
<div className='block aboutBlock'>
  <div className='container-about'>
    <div className='titleHolder'><h1>About us</h1></div>
    
      <Row className='rowBlock'>
        <Col span={12} className='col1' flex={1}>
          <img  className='image' src={image1} alt="About Us Image" />
        </Col>
        <Col span={12} className='col2'  >
          <div  className='textBlock'>
            <div  className='titleBlock'>
            <h4>Hey there!</h4>
            </div>
            <p>
          Welcome to PrintHub Pro! We provide top-notch printing solutions for everyone. With years of experience, we've become a trusted partner for businesses and individuals. Our goal is to deliver amazing results, from eye-catching marketing materials to elegant business cards and custom designs. By using the latest technology and focusing on customer satisfaction, we ensure every project is a success. Check out our services to see why we're your best option for all your printing needs!</p>
          </div>
        </Col>
      </Row>
  
  </div>
</div>    
    );
}