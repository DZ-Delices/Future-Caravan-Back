const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
      min: [1, "Table number must be at least 1"],
      max: [12, "There are only 12 tables available"], // limit tables
    },
    date: {
      type: Date,
      required: true,
    },
    timeFrom: {
      type: String,
      required: true,
    },
    timeTo: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["special_event", "dinner", "breakfast", "lunch"],
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: [1, "At least 1 person required"],
      max: [10, "A single table cannot seat more than 10 people"],
    },
    status: {
      type: String,
      enum: ["pending", "canceled", "completed"], // ✅ added status
      default: "pending", // default value when creating a new reservation
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
