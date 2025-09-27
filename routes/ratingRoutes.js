const express = require("express");
const { createRating, getRatings } = require("../controllers/ratingController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: API for managing user ratings and reviews
 */

/**
 * @swagger
 * /api/ratings/Rate:
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - rating
 *               - review
 *             properties:
 *               user:
 *                 type: string
 *                 description: The ID of the user giving the rating
 *               rating:
 *                 type: number
 *                 description: Rating value (1–5)
 *               review:
 *                 type: string
 *                 description: Optional review text
 *           example:   # 👈 Example request
 *             user: "64f1a2b4e1d23c1234567890"
 *             rating: 5
 *             review: "Amazing food, will order again!"
 *     responses:
 *       201:
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "6500c3e9d3f9c0f2a9a12345"
 *               user: "64f1a2b4e1d23c1234567890"
 *               rating: 5
 *               review: "Amazing food, will order again!"
 *               createdAt: "2025-09-27T12:34:56.789Z"
 *               updatedAt: "2025-09-27T12:34:56.789Z"
 *       500:
 *         description: Error creating rating
 */

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Get all ratings (with user info)
 *     tags: [Ratings]
 *     responses:
 *       200:
 *         description: List of ratings with user details
 *         content:
 *           application/json:
 *             example:
 *               - _id: "6500c3e9d3f9c0f2a9a12345"
 *                 user:
 *                   _id: "64f1a2b4e1d23c1234567890"
 *                   name: "John Doe"
 *                   profilePic: "uploads/users/john.jpg"
 *                 rating: 5
 *                 review: "Amazing food, will order again!"
 *                 createdAt: "2025-09-27T12:34:56.789Z"
 *               - _id: "6500c4f1d3f9c0f2a9a67890"
 *                 user:
 *                   _id: "64f1b3cde1d23c9876543210"
 *                   name: "Sarah Lee"
 *                   profilePic: "uploads/users/sarah.png"
 *                 rating: 4
 *                 review: "Good taste but delivery was a bit slow."
 *                 createdAt: "2025-09-27T12:40:12.345Z"
 *       500:
 *         description: Error fetching ratings
 */

// Routes
router.post("/Rate", createRating);
router.get("/", getRatings);

module.exports = router;
