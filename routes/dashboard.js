// routes/dashboard.js
const express = require("express");
const router = express.Router();
const { getAllUsers , getAllReservationDates, getCounts } = require("../controllers/dashboardController");

// GET /api/dashboard/users
router.get("/users", getAllUsers);
// Get all reservation dates
router.get("/reservations/dates", getAllReservationDates);
router.get("/counts", getCounts);

module.exports = router;
