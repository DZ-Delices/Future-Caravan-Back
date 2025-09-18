const express = require("express");
const { createRating, getRatings } = require("../controllers/ratingController");

const router = express.Router();

// Create a rating
router.post("/Rate", createRating);

// Get all ratings
router.get("/", getRatings);

module.exports = router;
