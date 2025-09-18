const Dish = require("../models/Dish");

exports.createDish = async (req, res) => {
  try {
    const dish = new Dish({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      picture: req.file ? req.file.path : "",
      averageRating: 0, // 👈 default value
    });

    await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    console.error("❌ Error creating dish:", error);
    res.status(500).json({ message: "Error creating dish", error });
  }
};


// 📌 Get all dishes
exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    console.error("❌ Error fetching dishes:", error);
    res.status(500).json({ message: "Error fetching dishes", error });
  }
};