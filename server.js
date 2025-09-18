const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Routes
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const otpRoutes = require("./routes/otp");

app.use("/api/otp", otpRoutes);
app.use("/api/adminauth", adminAuthRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
