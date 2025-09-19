const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
    try {
        const { userId, dishId, quantity } = req.body;

        if (!userId || !dishId || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const cartItem = new Cart({
            user: userId,
            dish: dishId,
            quantity
        });

        await cartItem.save();

        res.status(200).json({ message: "Dish added to cart successfully", cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

exports.getCartByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch cart items for this user and populate dish details
        const cartItems = await Cart.find({ user: userId })
            .populate("dish") // populate the dish reference
            .sort({ createdAt: -1 }); // optional: latest first

        res.status(200).json({ cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching cart items", error });
    }
};