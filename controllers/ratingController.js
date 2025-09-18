import Rating from "../models/Rating.js";

// Create a new rating
export const createRating = async (req, res) => {
  try {
    const { user, rating, review } = req.body;

    const newRating = new Rating({
      user,   // take userId from body
      rating,
      review,
    });

    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all ratings (with user info populated)
export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("user", "name profilePic");
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
