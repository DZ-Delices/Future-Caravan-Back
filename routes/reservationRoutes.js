const express = require("express");
const { createReservation, getAvailableTables } = require("../controllers/reservationController");

const router = express.Router();

// 📌 Reserve a table
router.post("/", createReservation);

// 📌 Get available tables
router.get("/available", getAvailableTables);

module.exports = router;
