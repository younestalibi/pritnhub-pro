const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Profile } = require("../models");
const secretKey = "your-secret-key";
const { validationResult } = require("express-validator");
const Mail = require("../services/EmailService");

// Get users
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({ include: "profile" });

    if (users) {
      res.status(200).json({ message: "Returned Users successfully", users });
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    var user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const profile = await Profile.create({
      first_name: name,
      user_id: user.id,
    });

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "5h" });
    await Mail.send(email, "Welcome to Printhub-Pro", "register.ejs", { name });

    res
      .status(201)
      .json({ message: "User registered successfully", user, token, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: "profile" });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "5h",
      });
      res.status(200).json({ message: "Login successful", token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user information
exports.getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId, { include: "profile" });

    if (user) {
      res.status(200).json({ message: "Returned User successfully", user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User logout
exports.logout = (req, res) => {
  //logic
  res.json({ message: "Logged out successfully" });
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id || req.userId;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await User.destroy({ where: { id: userId } });

    if (user) {
      res.json({ message: "User deleted successfully", id: userId });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const {
      first_name,
      last_name,
      phone_number,
      city,
      country,
      avatar,
      company_name,
      website,
      email,
    } = req.body;

    const user = await User.findByPk(userId, { include: "profile" });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.profile) {
      user.profile.first_name = first_name;
      user.profile.last_name = last_name;
      user.profile.phone_number = phone_number;
      user.profile.city = city;
      user.profile.country = country;
      user.profile.avatar = avatar;
      user.profile.company_name = company_name;
      user.profile.website = website;
      await user.profile.save();
    } else {
      await Profile.create({
        first_name,
        last_name,
        phone_number,
        city,
        country,
        avatar,
        company_name,
        website,
        user_id: userId,
      });
    }

    user.email = email;
    await user.save();

    res
      .status(200)
      .json({ message: "User Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(422).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
