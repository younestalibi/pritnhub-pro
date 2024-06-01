import { Card, Col, Row } from "antd";
import "../../../App.css";
import "./contact.css";
import ContactForm from "./ContactForm";
import { EnvironmentFilled, FormOutlined, PhoneFilled } from "@ant-design/icons";
import MapIframe from "./iframMap";


export default function ContactApp() {
  return (
    <div className="">
      <div className="block contactBlock">
        <div className="titleBlock">
          <h1>Get In Touch</h1>
          <p>
            &quot; We love hearing from you. Reach out below and let us know how
            we can help you. &quot;
          </p>
        </div>
        <div className="overlay">
          <div className="overlay-content">
            <div>
              <Card hoverable style={{ width: 300 }}>
                <div className="cardContent">
                  <PhoneFilled
                    style={{
                      color: "#1890ff",
                      fontSize: "30px",
                      border: "2px solid #1890ff",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  />
                  <h3>call us</h3>
                  <p>+212-758640011</p>
                  <p>+212-758640011</p>
                </div>
              </Card>
            </div>
            <div>
              <Card hoverable style={{ width: 300 }}>
                <div className="cardContent">
                  <FormOutlined
                    style={{
                      color: "#1890ff",
                      fontSize: "30px",
                      border: "2px solid #1890ff",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  />
                  <h3>Fill out a form</h3>
                  <p>
                    Fill out the form below and we'll respond to your email
                    promptly.!
                  </p>
                </div>
              </Card>
            </div>
            <div>
              <Card hoverable style={{ width: 300 }}>
                <div className="cardContent">
                  <EnvironmentFilled
                    style={{
                      color: "#1890ff",
                      fontSize: "30px",
                      border: "2px solid #1890ff",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  />
                  <h3>Our Location</h3>
                  <p>1234 Main St, Anytown, USA</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid formContainer">
   
        <div className="contactFormBlock">
        <Col span={24} >
        <div className='titleHolder'><h1>Contact Us</h1> 
          <p style={{ textAlign: 'center',fontSize:'18px' }}>
          If you have any questions or need further information, feel free to reach out to us through the form below.
           We are here to help you!
          </p>
          </div>
        </Col>
          <Row className="rowBlock">
            <Col span={8} className="imgCol">
             
            </Col>
            <Col span={16} className="formCol">
                <div className="divContact"> 
              <h1>Get in Touch</h1>
              <ContactForm />
              </div>
            </Col>
          </Row>
              
        </div>
      </div>
      <div style={{marginBottom:'1rem'}}>
        <MapIframe/>
      </div>
    </div>
  );
}
