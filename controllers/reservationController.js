const Reservation = require("../models/Reservation");

// 📌 Create a reservation
exports.createReservation = async (req, res) => {
  try {
    const { tableNumber, date, timeFrom, timeTo, purpose, numberOfPeople } = req.body;
    console.log("📥 Incoming reservation request:", req.body);

    // Check for conflicts
    const conflict = await Reservation.findOne({
      tableNumber,
      date: new Date(date),
      $or: [
        { timeFrom: { $lt: timeTo }, timeTo: { $gt: timeFrom } } // overlap
      ],
    });

    if (conflict) {
      return res.status(400).json({ message: "This table is already reserved at that time." });
    }

    // ✅ Use user from JWT instead of req.body.userId
    const reservation = new Reservation({
      userId: req.user._id,
      tableNumber,
      date: new Date(date),
      timeFrom,
      timeTo,
      purpose,
      numberOfPeople,
    });

    await reservation.save();

    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.error("❌ Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// 📌 Get available tables
exports.getAvailableTables = async (req, res) => {
  try {
    const { date, timeFrom, timeTo } = req.query;

    const reservations = await Reservation.find({
      date: new Date(date),
      $or: [
        { timeFrom: { $lt: timeTo }, timeTo: { $gt: timeFrom } }
      ],
    });

    const reservedTables = reservations.map(r => r.tableNumber);

    // Example: 12 tables in restaurant
    const allTables = Array.from({ length: 12 }, (_, i) => i + 1);
    const availableTables = allTables.filter(t => !reservedTables.includes(t));

    res.status(200).json({ availableTables });
  } catch (error) {
    console.error("❌ Error fetching available tables:", error);
    res.status(500).json({ message: "Error fetching available tables", error });
  }
};
