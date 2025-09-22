const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// Place a new order (protected)
router.post("/place-order", protect, orderController.placeOrder);

// Get all orders for logged-in user (protected)
router.get("/", protect, orderController.getOrdersByUser);

module.exports = router;
