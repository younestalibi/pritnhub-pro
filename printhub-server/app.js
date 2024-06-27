const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');

const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const articleRoutes = require("./routes/articleRoutes");
const addressRoutes = require("./routes/addressRoutes");
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingRoutes = require('./routes/settingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { defaultSetting } = require("./controllers/SettingController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.APP_CLIENT
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
app.use('/api/paypal', paymentRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    defaultSetting()
  })
  .catch((err) => {
    console.error("Database synchronization error:", err);
  });
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.APP_URL}:${process.env.PORT}`);
});
