const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Payment routes

//--------------paypal--------------
router.get("/config", authMiddleware, PaymentController.getConfigPaypal);
router.post("/create-order", authMiddleware, PaymentController.createOrderPaypal);
router.post("/confirm-order", authMiddleware, PaymentController.confirmOrderPaypal);
router.post("/cancel-order", authMiddleware, PaymentController.cancleOrderPaypal);
//--------------paypal--------------

//--------------bank transfer--------------
router.post("/confirm-order-cih", authMiddleware, PaymentController.confirmOrderBank);
router.get("/config-bank", authMiddleware, PaymentController.getConfigBank);
//--------------bank transfer--------------


module.exports = router;
 