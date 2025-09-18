const express = require("express");
const upload = require("../utils/multerConfig");
const { createDish, getDishes } = require("../controllers/dishController");

const router = express.Router();

// Create dish (with image upload)
router.post("/create-dish", upload.single("picture"), createDish);

// Get all dishes
router.get("/", getDishes);



module.exports = router;
