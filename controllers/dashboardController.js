// controllers/dashboardController.js
const User = require("../models/User");
const Reservation = require("../models/Reservation");
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
    const users = await User.find().select("-password"); // exclude password for security
    res.status(200).json({
        success: true,
        count: users.length,
        users,
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Error fetching users",
        error,
    });
    }
};


// Get all reservation dates (regardless of status)
exports.getAllReservationDates = async (req, res) => {
  try {
    const reservations = await Reservation.find().select("date -_id"); // only get the date field
    const dates = reservations.map(r => r.date);
    res.status(200).json(dates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reservation dates", error });
  }
};
