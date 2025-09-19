const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const dishRoutes = require("./routes/dishRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const cartRoutes = require('./routes/cart');

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
app.use("/api/dishes", dishRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reservations", reservationRoutes);
app.use('/api/carts', cartRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
