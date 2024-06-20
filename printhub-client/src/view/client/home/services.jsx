import { Row, Col } from "antd";
const items = [
  {
    key: "1",
    icon: <i className="fa-regular fa-credit-card"></i>,
    title: "title1",
    content:
      "lorem20 most likely correct usage of iket is  formula is correct usage of the following",
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-headset"></i>,
    title: "title1",
    content:
      "lorem20 most likely correct usage of iket is correct usage of iket is",
  },
  {
    key: "3",
    icon: <i className="fa-solid fa-truck-fast"></i>,
    title: "title1",
    content:
      "correct usage of iket is  formula is correct usage of the following correct u",
  },
];

export default function AppService() {
  return (
    <div className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h1>Our Services</h1>
        </div>

        <Row gutter={[16, 16]}>
          {items.map((item) => {
            return (
              <Col span={8} key={item.key}>
                <div className="content">
                  <div className="icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
