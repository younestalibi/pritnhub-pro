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
import { Fade } from "react-awesome-reveal";
import ProductCard from "../products/productCard";

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
      <Fade triggerOnce direction="up">
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
      </Fade>
      <Row
        style={{ margin: "40px 0px" }}
        justify={"center"}
        align={"middle"}
        gutter={[40, 40]}
      >
        {products.length > 0 &&
          [...products]
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 6)
            .map((product, index) => (
              <Col key={index}>
                <Fade triggerOnce direction="up">
                  <ProductCard product={product} />
                </Fade>
              </Col>
            ))}
      </Row>
    </div>
  );
}
