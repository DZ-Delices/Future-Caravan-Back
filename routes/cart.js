const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * api/carts/add-to-cart:
 *   post:
 *     summary: Add a dish to the user's cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - dishId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64f1a2b4e1d23c1234567890"
 *               dishId:
 *                 type: string
 *                 example: "64f1b3cde1d23c9876543210"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Dish added to cart successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Dish added to cart successfully"
 *               cartItem:
 *                 _id: "6500c3e9d3f9c0f2a9a12345"
 *                 user: "64f1a2b4e1d23c1234567890"
 *                 dish: "64f1b3cde1d23c9876543210"
 *                 quantity: 2
 *                 createdAt: "2025-09-27T12:34:56.789Z"
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error adding to cart
 */

/**
 * @swagger
 * api/carts/user/{userId}:
 *   get:
 *     summary: Get all cart items for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *         example: "64f1a2b4e1d23c1234567890"
 *     responses:
 *       200:
 *         description: List of cart items for the user
 *         content:
 *           application/json:
 *             example:
 *               cartItems:
 *                 - _id: "6500c3e9d3f9c0f2a9a12345"
 *                   user: "64f1a2b4e1d23c1234567890"
 *                   dish:
 *                     _id: "64f1b3cde1d23c9876543210"
 *                     name: "Pizza Margherita"
 *                     price: 12.5
 *                   quantity: 2
 *                   createdAt: "2025-09-27T12:34:56.789Z"
 *                 - _id: "6500c4f1d3f9c0f2a9a67890"
 *                   user: "64f1a2b4e1d23c1234567890"
 *                   dish:
 *                     _id: "64f1b4d7e1d23c1122334455"
 *                     name: "Caesar Salad"
 *                     price: 8.99
 *                   quantity: 1
 *                   createdAt: "2025-09-27T12:40:12.345Z"
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Error fetching cart items
 */

// Routes
router.post("/add-to-cart", cartController.addToCart);
router.get("/user/:userId", cartController.getCartByUser);

module.exports = router;
