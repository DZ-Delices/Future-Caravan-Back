const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
  password: { type: String, required: true }, // store hashed password
  profilePic: { type: String, default: "" },
  points: { type: [Number], default: [] },
  fcmToken: { type: String }, 
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
