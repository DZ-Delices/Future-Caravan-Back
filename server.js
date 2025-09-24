const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ Import cors

const authRoutes = require("./routes/auth");
const dishRoutes = require("./routes/dishRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const cartRoutes = require('./routes/cart');
const dashboardRoutes = require("./routes/dashboard");
const employeeRoutes = require("./routes/employee");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// ✅ Enable CORS (allow frontend access)
app.use(cors({
  origin: "*", // change "*" to your frontend URL for more security, e.g. "http://localhost:3000"
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


const swaggerDocs = require("./config/swagger");
swaggerDocs(app); 
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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Bind to 0.0.0.0 so frontend can connect
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
