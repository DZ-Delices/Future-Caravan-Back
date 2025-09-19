const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs"); // for hashing password

// Create Employee
exports.createEmployee = async (req, res) => {
    try {
    const { name, phone, password, role, profilePic } = req.body;

    if (!name || !phone || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // check if phone already exists
    const existing = await Employee.findOne({ phone });
    if (existing) {
        return res.status(400).json({ message: "Employee with this phone already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({
        name,
        phone,
        password: hashedPassword,
        role,
        profilePic: profilePic || "",
    });

    await employee.save();

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password"); // exclude passwords
    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees", error });
  }
};
