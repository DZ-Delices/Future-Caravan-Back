const express = require("express");
const { createReservation, getAvailableTables } = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Reserve a table (protected route)
router.post("/", protect, createReservation);
// 📌 Get available tables
router.get("/available", getAvailableTables);

module.exports = router;
