const { Product } = require("../models");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// Get all products
exports.index = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["id", "desc"]] });

    if (products) {
      return res.status(200).json({
        products,
        message: "Returned Products Successfully!",
      });
    } else {
      res.status(404).json({ error: "Products not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const { catalog_id, name, options, quantity, price, description } =
        req.body;

      // res
      // .status(201)
      // .json({ message: options})
      // return ;
      let imagesPath = [];
      if (req.files) {
        req.files.forEach((image) => {
          if (image.path) {
            imagesPath.push(image.path);
          }
        });
      }
      const product = await Product.create({
        catalog_id,
        name,
        options: JSON.parse(options),
        quantity: JSON.parse(quantity),
        price,
        description,
        image: imagesPath,
      });
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Get a product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: ["Catalog"],
    });
    if (product) {
      res
        .status(200)
        .json({ product, message: "Product Returned Successfully!" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product
exports.updateProduct = [
  upload.array("images", 10),
  async (req, res) => {
    const productId = req.params.id;
    try {
      const {
        catalog_id,
        deletedImages,
        name,
        options,
        quantity,
        price,
        description,
      } = req.body;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      let imagesPath = [];
      if (req.files) {
        if (product.image) {
          imagesPath = [...product.image];
          imagesPath.forEach((imagePath, index) => {
            if (JSON.parse(deletedImages).includes(imagePath)) {
              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error("Error deleting image file:", err);
                }
              });
              imagesPath.splice(imagesPath.indexOf(imagePath), 1);
            }
          });
        }
        req.files.forEach((image) => {
          if (image.path) {
            imagesPath.push(image.path);
          }
        });
      } else {
        if (product.image && JSON.parse(deletedImages).length > 0) {
          imagesPath = [...product.image];
          imagesPath.forEach((imagePath, index) => {
            if (JSON.parse(deletedImages).includes(imagePath)) {
              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error("Error deleting image file:", err);
                }
              });
              imagesPath.splice(imagesPath.indexOf(imagePath), 1);
            }
          });
        }
      }

      product.name = name;
      product.catalog_id = catalog_id;
      product.options = JSON.parse(options);
      product.quantity = JSON.parse(quantity);
      product.price = price;
      product.description = description;
      product.image = imagesPath;

      await product.save();
      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Delete a product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const imagesPath = product.image;

    const deleted = await Product.destroy({ where: { id: productId } });
    if (deleted) {
      if (imagesPath) {
        imagesPath.forEach((imagePath) => {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Error deleting image file:", err);
            }
          });
        });
      }

      res
        .status(200)
        .json({ message: "Product deleted successfully", id: productId });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update product quantity by ID
exports.updateProductQuantity = async function (
  productId,
  quantityBought,
  transaction
) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (parseInt(product.quantity.max) < quantityBought) {
      throw new Error("Insufficient quantity available");
    }
    let newQuantity = (
      parseInt(product.quantity.max) - quantityBought
    ).toString();
    product.quantity = { ...product.quantity, max: newQuantity };

    await product.save({ transaction });

    return;
  } catch (error) {
    throw error;
  }
};
