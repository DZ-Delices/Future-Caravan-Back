const Admin = require("../models/Admin");

// Register new admin
const registerAdmin = async (req, res) => {
  try {
    const { adminName, phone, password } = req.body;

    if (!adminName || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExists = await Admin.findOne({ phone });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ adminName, phone, password });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        adminName: admin.adminName,
        phone: admin.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(400).json({ message: "Invalid phone or password" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid phone or password" });
    }

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        adminName: admin.adminName,
        phone: admin.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
