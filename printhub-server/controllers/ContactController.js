const { Contact } = require("../models");
const Mail = require("../services/EmailService");
// contact create
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    var contact = await Contact.create({
      name,
      email,
      message,
    });

    await Mail.send(email, "Your Contact Submission", "welcome.ejs", {
      name,
      message,
    });
    res.status(201).json({
      message: "Your message sent successfully!",
      contact,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//respond contact
exports.respondContact = async (req, res) => {
  const { email, message } = req.body;
  try {
    await Mail.send(email, "Your Contact Submission", "respond.ejs", {
      message,
    });

    return res.status(201).json({ message: "Your message sent successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.index = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [["id", "desc"]] });
    if (contacts) {
      return res
        .status(200)
        .json({ contacts, message: "Returned Contacts successfully!" });
    } else {
      return res.status(404).json({ error: "Contacts not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findByPk(contactId);
    if (contact) {
      return res.status(200).json({ contact });
    } else {
      return res.status(404).json({ error: "Contact not found !" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const deleted = await Contact.destroy({ where: { id: contactId } });
    if (deleted) {
      return res
        .status(200)
        .json({ message: "Contact deleted successfully!", id: contactId });
    } else {
      return res.status(404).json({ error: "Contact not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
