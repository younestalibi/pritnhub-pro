const { Setting } = require("../models");
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

// Get all settings
exports.index = async (req, res) => {
  try {
    const settings = await Setting.findByPk(1);
    console.log("==================");
    console.log(settings);
    console.log("==================");
    if (settings) {
      return res
        .status(200)
        .json({ settings, message: "Returned Settings Successfully!" });
    } else {
      res.status(404).json({ error: "Settings not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update settings
exports.updateSetting = [
  upload.single("logo"),
  async (req, res) => {
    try {
      const {
        phone_number,
        address,
        contact_email,
        website_name,
        social_media_links,
        whatsapp_chat_url,
      } = req.body;
      const setting = await Setting.findByPk(1);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      if (req.file) {
        if (setting.logo) {
          const oldImagePath = setting.logo;
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Error deleting old image:", err);
            }
          });
        }
        setting.logo = req.file.path;
      }

      setting.phone_number = phone_number;
      setting.address = address;
      setting.contact_email = contact_email;
      setting.website_name = website_name;
      setting.social_media_links = social_media_links;
      setting.whatsapp_chat_url = whatsapp_chat_url;
      await setting.save();
      res
        .status(200)
        .json({ message: "Setting updated successfully", setting });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Reset settings
exports.resetSetting = async (req, res) => {
  try {
    let [setting] = await Setting.findOrCreate({ where: { id: 1 } });
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    const newSetting = {
      phone_number: "+212600000000",
      address: "Tangier, Morocco",
      contact_email: "contact@printhub-pro.com",
      logo: "/path/to/logo.png",
      website_name: "Printhub-Pro",
      social_media_links: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        instagram: "https://instagram.com/",
      },
      whatsapp_chat_url: "https://wa.me/+2126000000000",
    };

    await setting.update(newSetting);
    res.status(200).json({ message: "Setting rested successfully", setting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.defaultSetting = async () => {
  const setting = await Setting.findByPk(1);
  if (!setting) {
    console.log('created setting------------')
    const newSetting = {
      phone_number: "+212600000000",
      address: "Tangier, Morocco",
      contact_email: "contact@printhub-pro.com",
      logo: "/path/to/logo.png",
      website_name: "Printhub-Pro", 
      social_media_links: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        instagram: "https://instagram.com/", 
      },
      whatsapp_chat_url: "https://wa.me/+2126000000000",
    };
    await Setting.create(newSetting);
  }
  return;
};
