const { Catalog } = require("../models");
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

// Create catalog
exports.createCatalog = [
  upload.single("image"),
  async (req, res) => {
    try {

      const { name } = req.body;
      let imagePath = null;
      if (req.file) {
        imagePath = req.file.path;
      }
      const catalog = await Catalog.create({
        name,
        image: imagePath,
      });
      res
        .status(201)
        .json({ message: "Catalog created successfully", catalog });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Get all catalogs
exports.index = async (req, res) => {
  try {
    const catalogs = await Catalog.findAll({ order: [["id", "desc"]] });
    if (catalogs) {
      return res
        .status(200)
        .json({ catalogs, message: "Returned Catalogs Successfully!" });
    } else {
      res.status(404).json({ error: "Catalogs not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a catalog by ID
exports.getCatalogById = async (req, res) => {
  const catalogId = req.params.id;
  try {
    const catalog = await Catalog.findByPk(catalogId);
    if (catalog) {
      res.status(200).json({ catalog });
    } else {
      res.status(404).json({ error: "Catalog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a catalog
exports.updateCatalog = [
  upload.single("image"),
  async (req, res) => {
    const catalogId = req.params.id;
    try {
      const { name } = req.body;
      const catalog = await Catalog.findByPk(catalogId);
      if (!catalog) {
        return res.status(404).json({ error: "Catalog not found" });
      }
      if (req.file) {
        if (catalog.image) {
          const oldImagePath = catalog.image;
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            }
          });
        }
        catalog.image = req.file.path;
      }

      catalog.name = name;
      await catalog.save();
      res
        .status(200)
        .json({ message: "Catalog updated successfully", catalog });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Delete a catalog
exports.deleteCatalog = async (req, res) => {
  const catalogId = req.params.id;

  try {
    const catalog = await Catalog.findByPk(catalogId);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog not found" });
    }
    const imagePath = catalog.image;

    const deleted = await Catalog.destroy({ where: { id: catalogId } });

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
        .json({ message: "Catalog deleted successfully", id: catalogId });
    } else {
      res.status(404).json({ error: "Catalog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
