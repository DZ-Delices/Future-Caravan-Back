const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  averageRating: { type: Number, default: 0 },
  description: { type: String },
  picture: { type: String }, // stores Cloudinary URL
});

module.exports = mongoose.model("Dish", dishSchema);
