// src/components/Footer.js
import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Footer } = Layout;

const AppFooter = () => {
  const { settings } = useSelector((state) => state.setting);
if(settings){
  // console.log(settings.w)
}
  return (
    <Footer className="footer">
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <h3>About Us</h3>
          <p>
            Printhub-Pro is dedicated to providing high-quality printing
            services. Our mission is to deliver exceptional value and customer
            satisfaction.
          </p>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h3>Contact Us</h3>
          <p>
            <PhoneOutlined /> {settings && settings.phone_number}
          </p>
          <p>
            <MailOutlined /> {settings && settings.contact_email}
          </p>
          <p>{settings && settings.address}</p>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h3>Follow Us</h3>
          <p>
            <a
              href={settings && settings.social_media_links.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
            <a
              href={settings && settings.social_media_links.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
            <a
              href={settings && settings.social_media_links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
          </p>
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        <Col>
          <p>{settings && settings.website_name} ©2024 Created by UpNetwork team</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
