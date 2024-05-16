const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secretKey = "your-secret-key";
const { validationResult } = require("express-validator");

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "5h" });

    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
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
    const user = await User.findByPk(userId);

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
  const userId = req.userId;

  try {
    const user = await User.destroy({ where: { id: userId } });

    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
