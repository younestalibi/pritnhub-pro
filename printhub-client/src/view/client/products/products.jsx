import { Col, Row, Empty } from "antd";
import { useParams } from "react-router-dom";
import "./products.css";
import "../../../App.css";
import image2 from "../../../assets/images/roll-ups.jpg";
import image1 from "../../../assets/images/t-shirt.avif";
import ProductCard from "./productCard";

const items = [
  {
    //
    key: "business-cards",
    name: "Business Cards",
    image: image1,
    description:
      "Business Cards are a collection of business cards that can be used to manage your business",
    products: [
      {
        key: "standard-business-cards",
        name: "Standard Business Cards",
        description: "High-quality standard-sized business cards.",
        image: image2,
      },
      {
        key: "premium-business-cards",
        name: "Premium Business Cards",
        description: "Luxury business cards with premium finishes.",
        image: image2,
      },
      {
        key: "die-cut-business-cards",
        name: "Die-Cut Business Cards",
        description: "Custom-shaped business cards for unique branding.",
        image: image2,
      },
      {
        key: "eco-friendly-business-cards",
        name: "Eco-Friendly Business Cards",
        description: "Business cards made from recycled materials.",
        image: image2,
      },
    ],
  },
  {
    key: "flyers-brochures",
    name: "Flyers & Brochures",
    image: image1,
    description: "Flyers & Brochures for unique branding ",
    products: [
      {
        key: "flyers",
        name: "Flyers",
        description: "Single or double-sided flyers for promotions.",
        image: image2,
      },
      {
        key: "brochures",
        name: "Brochures",
        description: "Multi-page brochures for detailed information.",
        image: image2,
      },
      {
        key: "leaflets",
        name: "Leaflets",
        description: "Small-sized flyers for quick distribution.",
        image: image2,
      },
      {
        key: "catalogs",
        name: "Catalogs",
        description: "Comprehensive product catalogs for detailed infos.",
        image: image2,
      },
    ],
  },
  {
    key: "banners-signs",
    name: "Banners & Signs",
    description:
      "Banners & Signs for quick distribution with additional information about the product",
    products: [
      {
        key: "vinyl-banners",
        name: "Vinyl Banners",
        description: "Durable banners for indoor and outdoor use.",
        image: image2,
      },
      {
        key: "retractable-banners",
        name: "Retractable Banners",
        description: "Portable banners with easy setup and storage.",
        image: image2,
      },
      {
        key: "corrugated-signs",
        name: "Corrugated Signs",
        description: "Lightweight signs for events and promotions.",
        image: image2,
      },
    ],
  },
];

export default function ProductList() {
  const { category } = useParams();
  const categoryItem = items.find((item) => item.key === category);
  if (
    !categoryItem ||
    !categoryItem.products ||
    categoryItem.products.length === 0
  ) {
    return (
      <div className="no-data">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }
  return (
    <div className="bgGray">
      <div className="block worksBlock">
        <div className="titleHolder">
          <h2>{categoryItem.name}</h2>
          <p>{categoryItem.description}</p>
        </div>
      </div>
      <div className="container">
        <Row gutter={[32, 32]}>
          {categoryItem.products.map((product) => (
            <Col span={6} key={product.key}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
