import { Row, Col, Flex, Card, Typography, Button, Divider } from "antd";
import { Fade } from "react-awesome-reveal";
import { AiOutlineLike } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { MdPayment } from "react-icons/md";

const { Meta } = Card;

export default function AppService() {
  return (
    <div style={{ padding: "40px 0px" }}>
      <Fade triggerOnce direction="up">
        <Flex
          justify="center"
          align="center"
          vertical={true}
          style={{ padding: "10px 40px" }}
        >
          <Divider style={{ width: "100%" }}>
            <Typography.Title>We Guarantee</Typography.Title>
          </Divider>
        </Flex>
      </Fade>
      <Row
        style={{ margin: "40px 0px" }}
        justify={"center"}
        align={"middle"}
        gutter={[40, 40]}
      >
        <Col>
          <Fade triggerOnce direction="left">
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                width: "250px",
                boxShadow: "none",
              }}
              cover={<MdPayment size={100} />}
            >
              <Meta
                style={{
                  textAlign: "center",
                }}
                title={"100% Secure Payment"}
                description={
                  "Your transactions are safe and secure with our advanced encryption technology."
                }
              />
            </Card>
          </Fade>
        </Col>
        <Col>
          <Fade triggerOnce direction="up">
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                width: "250px",
                boxShadow: "none",
              }}
              cover={<MdSupportAgent size={100} />}
            >
              <Meta
                style={{
                  textAlign: "center",
                }}
                title={"Responsive Customer Service"}
                description={
                  "By phone, form, or email, we are always here for you."
                }
              />
            </Card>
          </Fade>
        </Col>
        <Col>
          <Fade triggerOnce direction="up">
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                width: "250px",
                boxShadow: "none",
              }}
              cover={<TbTruckDelivery size={100} />}
            >
              <Meta
                style={{
                  textAlign: "center",
                }}
                title={"Fast Delivery"}
                description={"In 24 to 48 hours anywhere and anytime."}
              />
            </Card>
          </Fade>
        </Col>
        <Col>
          <Fade triggerOnce direction="right">
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                width: "250px",
                boxShadow: "none",
              }}
              cover={<AiOutlineLike size={100} />}
            >
              <Meta
                style={{
                  textAlign: "center",
                }}
                title={"Satisfaction Guaranteed"}
                description={
                  "Any non-conforming order will be reprinted and reshipped for free."
                }
              />
            </Card>
          </Fade>
        </Col>
      </Row>
    </div>
  );
}
