const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    Dish: {
      type: String,
      required: true,
    },
    PredictedQuantity: {
      type: Number,
      required: true,
    },
    Date: {
      type: String, // storing as string (YYYY-MM-DD)
      required: true,
    },
    Day: {
      type: String,
      required: true,
    },
    Weather: {
      type: String,
      required: true,
    },
    Temperature: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
