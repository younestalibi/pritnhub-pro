import { Col, Row, Tabs } from "antd";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
  const items = [
    { label: "Login", key: "0", children: <Login /> },
    { label: "Register", key: "1", children: <Register /> },
  ];
  return (
    <Row justify={"center"} align={'middle'}>
      <Col md={{ span:14 }} sm={{ span:0 }}>
        <div
          style={{
            backgroundColor: "gray",
            height: "100vh",
          }}
        ></div>
      </Col>
      <Col md={{ span:10 }} sm={{ span:20 }}>
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs animated={true} defaultActiveKey="0" centered items={items} />
        </div>
      </Col>
    </Row>
  );
};

export default Authentication;
