const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendNotificationToToken } = require("../utils/fcm"); 
// Register
exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Name, phone, and password are required." });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    // Check existing user
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: "Phone already registered." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, phone, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user: { name, phone, _id: user._id } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required." });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "User not found. Please register." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    let notificationStatus = "No FCM token available";
    if (user.fcmToken) {
      try {
        await sendNotificationToToken(
          user.fcmToken,
          "Welcome Back!",
          `Hello ${user.name}, you have successfully logged in!`
        );
        notificationStatus = "Notification sent";
      } catch (err) {
        notificationStatus = `Notification failed: ${err.message}`;
      }
    }

    res.status(200).json({ 
      message: "Login successful", 
      user: { name: user.name, phone: user.phone, _id: user._id },
      notificationStatus
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};