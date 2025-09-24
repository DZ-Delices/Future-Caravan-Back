const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// Place a new order (protected)
router.post("/place-order", protect, orderController.placeOrder);

// Get all orders for logged-in user (protected)
router.get("/", protect, orderController.getOrdersByUser);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing customer orders
 */

/**
 * @swagger
 * /api/orders/place-order:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - dishId
 *                     - quantity
 *                   properties:
 *                     dishId:
 *                       type: string
 *                       description: The ID of the dish
 *                       example: 652b14d8f2a1f4a9c1234567
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: received
 *                       message:
 *                         type: string
 *                         example: Your order has been received! It will take approximately 30 minutes.
 *       400:
 *         description: Items are required or Dish not found
 *       401:
 *         description: Unauthorized (no token provided)
 *       500:
 *         description: Failed to place order
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized (no token provided)
 *       500:
 *         description: Failed to get orders
 */


module.exports = router;
