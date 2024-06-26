import React, { useState } from "react";
import "./styles.css";

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="product-gallery">
      <img
        src={selectedImage}
        crossOrigin={import.meta.env.VITE_CLIENT_URL}
        alt="Selected"
        className="main-image"
      />
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            crossOrigin={import.meta.env.VITE_CLIENT_URL}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImage === image ? "active" : ""}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
