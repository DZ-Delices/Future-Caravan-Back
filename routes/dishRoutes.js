const express = require("express");
const upload = require("../utils/multerConfig");
const { createDish, getDishes } = require("../controllers/dishController");

const router = express.Router();

// Create dish (with image upload)
router.post("/create-dish", upload.single("picture"), createDish);

// Get all dishes
router.get("/", getDishes);

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
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: Name of the dish
 *       - in: formData
 *         name: price
 *         type: number
 *         required: true
 *         description: Price of the dish
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *         description: Description of the dish
 *       - in: formData
 *         name: picture
 *         type: file
 *         required: false
 *         description: Image of the dish
 *     responses:
 *       201:
 *         description: Dish created successfully
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
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   picture:
 *                     type: string
 *                   averageRating:
 *                     type: number
 *       500:
 *         description: Error fetching dishes
 */


module.exports = router;
