const express = require("express");
const { createReservation, getAvailableTables } = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
// 📌 Reserve a table (protected route)
router.post("/", protect, createReservation);
// 📌 Get available tables
router.get("/available", getAvailableTables);


/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing table reservations
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tableNumber
 *               - date
 *               - timeFrom
 *               - timeTo
 *               - numberOfPeople
 *             properties:
 *               tableNumber:
 *                 type: integer
 *                 example: 5
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-24
 *               timeFrom:
 *                 type: string
 *                 description: Start time (24h format)
 *                 example: "18:00"
 *               timeTo:
 *                 type: string
 *                 description: End time (24h format)
 *                 example: "20:00"
 *               purpose:
 *                 type: string
 *                 example: Birthday dinner
 *               numberOfPeople:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reservation created successfully
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Conflict — table already reserved at that time
 *       401:
 *         description: Unauthorized (no token provided)
 *       500:
 *         description: Error creating reservation
 */

/**
 * @swagger
 * /api/reservations/available:
 *   get:
 *     summary: Get available tables for a given time
 *     tags: [Reservations]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-09-24
 *       - in: query
 *         name: timeFrom
 *         required: true
 *         schema:
 *           type: string
 *         example: "18:00"
 *       - in: query
 *         name: timeTo
 *         required: true
 *         schema:
 *           type: string
 *         example: "20:00"
 *     responses:
 *       200:
 *         description: List of available tables
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableTables:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: 3
 *       500:
 *         description: Error fetching available tables
 */

module.exports = router;
