const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const authRoutes = require("./routes/authRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const articleRoutes = require("./routes/articleRoutes");
const addressRoutes = require("./routes/addressRoutes");
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingRoutes = require('./routes/settingRoutes');
const { sequelize } = require("./models");
const helmet = require("helmet");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.APP_CLIENT,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/address", addressRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/setting', settingRoutes);
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.APP_URL}:${process.env.PORT}`);
});
