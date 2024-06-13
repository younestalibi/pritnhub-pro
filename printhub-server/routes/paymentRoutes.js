const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Payment routes
router.get("/config", authMiddleware, PaymentController.getConfigPaypal);
router.post("/create-order", authMiddleware, PaymentController.createOrderPaypal);
router.post("/update-order-status", authMiddleware, PaymentController.updateOrderStatus);


module.exports = router;
