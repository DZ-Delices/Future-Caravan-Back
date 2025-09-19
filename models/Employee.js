const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
    departement: { type: String, required: true, enum: ["chef", "waiter", "manager", "cleaning"] },
    password: { type: String, required: true }, // hashed password
    profilePic: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
