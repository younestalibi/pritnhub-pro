import { useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  //solve this error
  const [save, setSave] = useState(false);
  const changeStateIcon = () => {
    setSave((prevSave) => !prevSave);
  };
  return (
    <Link to={`/product/${product.key}`}>
      <Card
        hoverable
        style={{ width: 270 }}
        cover={
          <img
            alt={product.name}
            src={product.image}
            style={{ borderColor: "black" }}
          />
        }
      >
        <div className="card-content">hello world
          <Meta title={product.name} description={product.description} />
          <i
            className={
              save
                ? "fa-solid fa-bookmark fa-lg"
                : "fa-regular fa-bookmark fa-lg"
            }
            id="icon"
            onClick={changeStateIcon}
          ></i>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
ProductCard.propTypes = {
  product: {}
}