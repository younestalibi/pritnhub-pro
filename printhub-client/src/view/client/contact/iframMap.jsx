import { Col, Row } from "antd";


const MapIframe = () => {
    return (
        <>
        <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={24} md={20} lg={16} >
        <div className='titleHolder'><h1>Our locations</h1> </div>
          <p style={{ textAlign: 'center',fontSize:'18px' }}>
            Discover the places where you can find us. Below are our key locations that you might want to visit. We are
            always excited to welcome you!
          </p>
         
        </Col>
      </Row> 
      <Row justify="center" style={{ padding: 0 }}>
        <Col span={24}>
            <div style={{ width: '100%', height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51890.21673598294!2d-5.325516538474019!3d35.62431085657016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b44d0f3693aab%3A0xf04acf727d86178!2sMartil!5e0!3m2!1sen!2sma!4v1717249767513!5m2!1sen!2sma" 
                width="100%"
                height="100%"
                style={{ border: 0 ,margin: 0 ,padding: 0}}
                allowFullScreen="true"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
     
        </Col>
      </Row>
      </>
    );
  };
  
  export default MapIframe;
  