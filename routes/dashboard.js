// routes/dashboard.js
const express = require("express");
const router = express.Router();
const { getAllUsers , getAllReservationDates, getCounts } = require("../controllers/dashboardController");

// GET /api/dashboard/users
router.get("/users", getAllUsers);
// Get all reservation dates
router.get("/reservations/dates", getAllReservationDates);
router.get("/counts", getCounts);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard data (users, reservations, counts)
 */

/**
 * @swagger
 * /api/dashboard/users:
 *   get:
 *     summary: Get all users
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: List of all users (password excluded)
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 2
 *               users:
 *                 - _id: "6500d5f9a1b2c3d4e5f67890"
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   role: "customer"
 *                 - _id: "6500d600a1b2c3d4e5f67891"
 *                   name: "Jane Smith"
 *                   email: "jane@example.com"
 *                   role: "employee"
 *       500:
 *         description: Error fetching users
 */

/**
 * @swagger
 * /api/dashboard/reservations/dates:
 *   get:
 *     summary: Get all reservation dates
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: A list of reservation dates
 *         content:
 *           application/json:
 *             example:
 *               - "2025-09-25T00:00:00.000Z"
 *               - "2025-09-26T00:00:00.000Z"
 *       500:
 *         description: Error fetching reservation dates
 */

/**
 * @swagger
 * /api/dashboard/counts:
 *   get:
 *     summary: Get counts of users and employees
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: User and employee counts
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               userCount: 12
 *               employeeCount: 3
 *       500:
 *         description: Error fetching counts
 */

module.exports = router;
