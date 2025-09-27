const express = require("express");
const upload = require("../utils/multerConfig");
const { createDish, getDishes } = require("../controllers/dishController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: API for managing dishes
 */

/**
 * @swagger
 * /api/dishes/create-dish:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dishes]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the dish
 *               price:
 *                 type: number
 *                 description: Price of the dish
 *               description:
 *                 type: string
 *                 description: Description of the dish
 *               picture:
 *                 type: string
 *                 format: binary
 *                 description: Image of the dish
 *           example:    # ✅ Example request body
 *             name: "Pizza Margherita"
 *             price: 12.5
 *             description: "Classic Italian pizza with tomato, mozzarella, and basil"
 *             picture: (upload file here)
 *     responses:
 *       201:
 *         description: Dish created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "6500c3e9d3f9c0f2a9a12345"
 *               name: "Pizza Margherita"
 *               price: 12.5
 *               description: "Classic Italian pizza with tomato, mozzarella, and basil"
 *               picture: "uploads/1695812345678-pizza.jpg"
 *               averageRating: 0
 *               createdAt: "2025-09-27T12:34:56.789Z"
 *               updatedAt: "2025-09-27T12:34:56.789Z"
 *       500:
 *         description: Error creating dish
 */

/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: A list of dishes
 *         content:
 *           application/json:
 *             example:
 *               - _id: "6500c3e9d3f9c0f2a9a12345"
 *                 name: "Pizza Margherita"
 *                 price: 12.5
 *                 description: "Classic Italian pizza with tomato, mozzarella, and basil"
 *                 picture: "uploads/1695812345678-pizza.jpg"
 *                 averageRating: 4.5
 *               - _id: "6500c4f1d3f9c0f2a9a67890"
 *                 name: "Caesar Salad"
 *                 price: 8.99
 *                 description: "Fresh salad with chicken, parmesan, and croutons"
 *                 picture: "uploads/1695812398765-salad.jpg"
 *                 averageRating: 4.0
 *       500:
 *         description: Error fetching dishes
 */

// Routes
router.post("/create-dish", upload.single("picture"), createDish);
router.get("/", getDishes);

module.exports = router;
