const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true }, // reference to existing Dish schema
      quantity: { type: Number, required: true },
      specialRequest: { type: String },
    }
  ],

  status: { type: String, enum: ["received", "processing", "completed"], default: "received" },

  totalTime: { type: Number, required: true }, // total prep time in minutes

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
