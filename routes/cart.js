const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add a predicted dish to cart by ID
router.post("/add-to-cart", cartController.addToCart);
// Get user cart with dish details
router.get("/user/:userId", cartController.getCartByUser);

module.exports = router;
