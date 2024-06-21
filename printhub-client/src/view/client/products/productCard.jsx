import { useState } from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
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
          src={`${import.meta.env.VITE_SERVER_URL}/${product.image[0]}`}
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
      <Link to={`/product/${product.id}`}>
        <Button
          block
          type="primary"
          style={{
            margin: "10px 0px",
            backgroundColor: "#c43b53",
            padding: "19px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Order
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
ProductCard.propTypes = {
  product: {},
};
