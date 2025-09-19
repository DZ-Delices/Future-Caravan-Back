const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place a new order
router.post("/place", orderController.placeOrder);

// Get all orders by a user
router.get("/:userId", orderController.getOrdersByUser);

module.exports = router;
