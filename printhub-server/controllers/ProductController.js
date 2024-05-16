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
      return res
        .status(200)
        .json({ products, message: "Returned Products Successfully!" });
    } else {
      res.status(404).json({ error: "Products not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new product
exports.createProduct = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { catalog_id, name, options, quantity, price, description } =
        req.body;
      let imagePath = null;
      if (req.file) {
        imagePath = req.file.path;
      }
      const product = await Product.create({
        catalog_id,
        name,
        options,
        quantity,
        price,
        description,
        image: imagePath,
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
  upload.single("image"),
  async (req, res) => {
    const productId = req.params.id;
    try {
      const { catalog_id, name, options, quantity, price, description } =
        req.body;
        const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (req.file) {
        if (product.image) {
          const oldImagePath = product.image;
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            }
          });
        }
        product.image = req.file.path;
      }
      product.name = name;
      product.catalog_id = catalog_id;
      product.options = options;
      product.quantity = quantity;
      product.price = price;
      product.description = description;

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
    const imagePath = product.image;

    const deleted = await Product.destroy({ where: { id: productId } });
    if (deleted) {
      if (imagePath) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
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
