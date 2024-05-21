const {Article} = require("../models");
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
      const {  name, description,unit_price ,quantity, image } =
        req.body;
      let imagePath = null;
      if (req.file) {
        imagePath = req.file.path;
      }
      const article = await Article.create({  
        name,
        description,
        unit_price,
        quantity,
        image: imagePath
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
      const { name, description, unit_price,quantity, image } =
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

