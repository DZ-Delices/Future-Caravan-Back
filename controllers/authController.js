const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendNotificationToToken } = require("../utils/fcm");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, phone, password, fcmToken } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Name, phone, and password are required." });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: "Phone already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      fcmToken,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { name, phone, _id: user._id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
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

    // 🔹 Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save hashed refreshToken in DB
    const hashedRT = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRT;
    await user.save();

    // Send refreshToken in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

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
      accessToken,
      notificationStatus,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Missing refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Compare with hashed refreshToken in DB
    const isValid = await bcrypt.compare(token, user.refreshToken);
    if (!isValid) {
      user.refreshToken = null; // clear compromised token
      await user.save();
      return res.status(403).json({ message: "Invalid or expired refresh token. Please log in again." });
    }

    // Rotate tokens
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
