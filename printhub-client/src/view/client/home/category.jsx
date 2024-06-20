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
import image1 from "../../../assets/images/t-shirt.avif";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import {
  getCatalogs,
  resetStateCatalog,
} from "../../../provider/features/catalog/CatalogSlice";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const items = [
  {
    key: "business-cards",
    title: "Business Cards",
    image: image1,
  },
  {
    key: "flyers-brochures",
    title: "Flyers & Brochures",
    image: image1,
  },
  {
    key: "banners-signs",
    title: "Banners Signs",
    image: image1,
  },
];

export default function AppCategory() {
  const chunkSize = 3;

  const chunkedItems = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunkedItems.push(items.slice(i, i + chunkSize));
  }
  const { catalogs, getCatalogsState } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogs.length == 0) {
      dispatch(getCatalogs());
    } else {
      dispatch(resetStateCatalog());
    }
  }, []);
  return (
    <div style={{ minHeight: "100vh",padding:'40px 0px' }}>
      <Flex
        justify="center"
        align="center"
        vertical={true}
        style={{ padding: "10px 40px" }}
      >
        <Typography.Title>Our Printing Categories</Typography.Title>
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
        {catalogs.length > 0 &&
          catalogs.slice(0, 6).map((catalog, index) => (
            <Col key={index}>
              <Link to={`/category/${catalog.id}`}>
                <Card
                  className="home-card"
                  cover={
                    <img
                      alt={catalog.name}
                      style={{
                        aspectRatio: "1 / 1",
                        height: "200px",
                        width: "250px",
                        objectFit: "cover",
                      }}
                      crossOrigin={import.meta.env.VITE_CLIENT_URL}
                      src={`${import.meta.env.VITE_SERVER_URL}/${
                        catalog.image
                      }`}
                    />
                  }
                >
                  <Meta
                    style={{
                      textAlign: "center",
                    }}
                    title={catalog.name}
                    description={catalog.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      <Flex justify="center" align="center">
        <Button size="large" type="dashed">
          Explore all categories
        </Button>
      </Flex>
    </div>
  );
}
