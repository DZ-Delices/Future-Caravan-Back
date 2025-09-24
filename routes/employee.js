const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Create employee
router.post("/create", employeeController.createEmployee);
// Get all employees
router.get("/", employeeController.getAllEmployees);
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API for managing employees
 */

/**
 * @swagger
 * /api/employees/create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "+213654789321"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               role:
 *                 type: string
 *                 example: waiter
 *               departement:
 *                 type: string
 *                 example: kitchen
 *               profilePic:
 *                 type: string
 *                 example: "uploads/profilePic.jpg"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee created successfully
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Missing required fields or employee already exists
 *       500:
 *         description: Error creating employee
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees (without passwords)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Error fetching employees
 */


module.exports = router;
