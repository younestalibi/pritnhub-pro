const { Article } = require("../models");
const multer = require("multer");
const fs = require("fs");
const Mail = require("../services/EmailService");

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

// Get all articles
exports.index = async (req, res) => {
  try {
    const articles = await Article.findAll({ order: [["id", "desc"]] });
    if (articles) {
      return res
        .status(200)
        .json({ articles, message: "Returned articles Successfully!" });
    } else {
      res.status(404).json({ error: "Articles not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new article
exports.createArticle = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, unit_price, quantity, min_quantity } =
        req.body;
      let imagePath = null;
      if (req.file) {
        imagePath = req.file.path;
      }
      const article = await Article.create({
        name,
        description,
        min_quantity,
        unit_price,
        quantity,
        image: imagePath,
      });
      res
        .status(201)
        .json({ message: "Article created successfully", article });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Update an article
exports.updateArticle = [
  upload.single("image"),
  async (req, res) => {
    const articleId = req.params.id;
    try {
      const { name, description, unit_price, quantity, min_quantity } =
        req.body;
      const article = await Article.findByPk(articleId);

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      if (req.file) {
        if (article.image) {
          const oldImagePath = article.image;
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            }
          });
        }
        article.image = req.file.path;
      }
      article.name = name;
      article.min_quantity = min_quantity;
      article.description = description;
      article.unit_price = unit_price;
      article.quantity = quantity;

      await article.save();
      res
        .status(200)
        .json({ message: "Article updated successfully", article });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Get an article by ID
exports.getArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId);
    if (article) {
      res
        .status(200)
        .json({ article, message: "Article Returned Successfully!" });
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: "Artilce not found" });
    }
    const imagePath = article.image;

    const deleted = await Article.destroy({ where: { id: articleId } });
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
        .json({ message: "Article deleted successfully", id: articleId });
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update quantity
exports.updateArticleQuantity = async function (
  articleId,
  quantityTaken,
  transaction
) {
  try {
    console.log(quantityTaken);

    const article = await Article.findByPk(articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    if (quantityTaken > article.quantity) {
      throw new Error(
        `Insufficient quantity available in the article ${article.name}`
      );
    }
    let newQuantity = article.quantity - quantityTaken;
    article.quantity = newQuantity;
    if (article.quantity < article.min_quantity) {
      await Mail.send(
        process.env.MAIL_APP,
        `${article.name} is running out of the stock!`,
        "stock.ejs",
        { articleName: article.name }
      );
    }
    await article.save({ transaction });

    return;
  } catch (error) {
    throw error;
  }
};
