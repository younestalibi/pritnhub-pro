import { Col, Row, Typography } from "antd";
import image1 from "../../../assets/images/about.jpg";
import { Fade, Slide } from "react-awesome-reveal";
const { Text, Paragraph } = Typography;
export default function AppAbout() {
  return (
    <Row
      style={{
        minHeight: "100vh",
      }}
      justify={"space-around"}
      align={"middle"}
    >
      <Col sm={24} md={12} xs={24} style={{ padding: "10px 40px" }}>
        <Fade triggerOnce direction="left">
          <img
            src={image1}
            alt=""
            style={{
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Fade>
      </Col>
      <Col
        sm={24}
        md={12}
        xs={24}
        style={{ padding: "10px 40px", textAlign: "justify" }}
      >
        <Fade triggerOnce direction="right">
          <Typography.Title level={1}>About Us</Typography.Title>
          <Paragraph
            style={{
              fontSize: "23px",
            }}
          >
            Welcome to PrintHub Pro! We provide top-notch printing solutions for
            everyone.
          </Paragraph>
          <Paragraph
            style={{
              fontSize: "23px",
            }}
          >
            With years of experience, we've become a trusted partner for
            businesses and individuals.
          </Paragraph>
          <Paragraph
            style={{
              fontSize: "23px",
            }}
          >
            Our goal is to deliver amazing results, from eye-catching marketing
            materials to elegant business cards and custom designs.
          </Paragraph>
        </Fade>
      </Col>
    </Row>
  );
}
