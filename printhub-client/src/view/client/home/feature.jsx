import { Card, Row, Col } from "antd";
import image1 from "../../../assets/images/t-shirt.avif";
const { Meta } = Card;
const items = [
  {
    key: "1",
    title: "title1",
    image: image1,
  },
  {
    key: "2",
    title: "title1",
    image: image1,
  },
  {
    key: "3",
    title: "title1",
    image: image1,
  },
  {
    key: "4",
    title: "title1",
    image: image1,
  },
];

export default function AppFeature() {
  return (
    <div className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h1>Featured products</h1>
        </div>
        <Row gutter={[16, 16]}>
          {items.map((item) => {
            return (
              <Col span={6} key={item.key}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={item.image} />}
                  onClick={() => alert("Hello from here")}
                >
                  <Meta title={item.title} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
