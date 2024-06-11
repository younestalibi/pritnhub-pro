const { Setting } = require("../models");

// Get all settings
exports.index = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    if (settings) {
      return res.status(200).json({ settings, message: "Returned Settings Successfully!" });
    } else {
      res.status(404).json({ error: "Settings not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    for (const key in updates) {
      if (Object.hasOwnProperty.call(updates, key)) {
        await Setting.update({ value: updates[key] }, { where: { key } });
      }
    }
    res.status(200).json({ message: "Settings updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
