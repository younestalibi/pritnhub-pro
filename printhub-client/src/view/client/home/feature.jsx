import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Flex,
  Row,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetStateProduct,
} from "../../../provider/features/product/ProductSlice";

const { Meta } = Card;

export default function AppFeature() {
  const dispatch = useDispatch();

  const { products, getProductsState } = useSelector((state) => state.product);

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getProducts());
    } else {
      dispatch(resetStateProduct());
    }
  }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "40px 0px" }}>
      <Flex
        justify="center"
        align="center"
        vertical={true}
        style={{ padding: "10px 40px" }}
      >
        <Typography.Title>Our Featured Printing Products</Typography.Title>
        <Typography.Paragraph style={{ fontSize: "22px" }}>
          High-quality solutions tailored to meet your needs.
        </Typography.Paragraph>
      </Flex>
      <Row
        style={{ margin: "40px 0px" }}
        justify={"center"}
        align={"middle"}
        gutter={[40, 40]}
      >
        {products.length > 0 &&
          products.slice(0, 6).map((product, index) => (
            <Col key={index}>
              <Link to={`/product/${product.id}`}>
                <Card
                  className="home-card"
                  cover={
                    <img
                      alt={product.name}
                      style={{
                        aspectRatio: "1 / 1",
                        height: "200px",
                        width: "250px",
                        objectFit: "cover",
                      }}
                      crossOrigin={import.meta.env.VITE_CLIENT_URL}
                      src={`${import.meta.env.VITE_SERVER_URL}/${
                        product.image[0]
                      }`}
                    />
                  }
                >
                  <Meta
                    style={{
                      textAlign: "center",
                    }}
                    title={product.name}
                    // description={product.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      <Flex justify="center" align="center">
        <Button size="large" type="dashed">
          Explore all Products
        </Button>
      </Flex>
    </div>
  );
}
