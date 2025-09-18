// models/Otp.js
const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
});

// ✅ Export the model
module.exports = mongoose.model("Otp", otpSchema);
