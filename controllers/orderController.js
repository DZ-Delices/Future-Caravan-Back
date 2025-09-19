const Order = require("../models/Order");
const Dish = require("../models/Dish");
const User = require("../models/User");
const { sendNotificationToToken } = require("../utils/fcm");

// Place a new order
exports.placeOrder = async (req, res) => {
    try {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0) {
        return res.status(400).json({ message: "User ID and items are required" });
    }

    // Calculate total preparation time (sum of all dishes)
    let totalTime = 0;
    for (let item of items) {
        const dish = await Dish.findById(item.dishId);
        if (!dish) return res.status(404).json({ message: `Dish not found: ${item.dishId}` });

      totalTime += dish.preparationTime || 20; // fallback 20 mins
    }

    // Save order
    const order = new Order({ userId, items, totalTime });
    await order.save();

    // Get user
    const user = await User.findById(userId);

    // Store notification messages to return in response
    const notifications = [];

    // Send "Order received" notification
    const receivedMessage = `Your order has been received! It will take approximately ${totalTime} minutes.`;
    if (user.fcmToken) await sendNotificationToToken(user.fcmToken, "Order Received", receivedMessage);
    notifications.push({ type: "received", message: receivedMessage });

    // Schedule "Processing" notification (half time)
    setTimeout(async () => {
        order.status = "processing";
        await order.save();

        const processingMessage = "Your order is now under processing.";
        if (user.fcmToken) await sendNotificationToToken(user.fcmToken, "Order Processing", processingMessage);
        console.log(`Notification sent: ${processingMessage}`);
    }, (totalTime / 2) * 60 * 1000);

    // Schedule "Completed" notification (full time)
    setTimeout(async () => {
        order.status = "completed";
        await order.save();

        const completedMessage = "Your order is completed! Enjoy your meal.";
        if (user.fcmToken) await sendNotificationToToken(user.fcmToken, "Order Completed", completedMessage);
        console.log(`Notification sent: ${completedMessage}`);
    }, totalTime * 60 * 1000);

    res.status(200).json({
        success: true,
        message: "Order placed successfully",
        order,
        notifications
    });

    } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to place order", error });
    }
};

// Get all orders by user
exports.getOrdersByUser = async (req, res) => {
    try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("items.dishId");
    res.status(200).json({ success: true, orders });
    } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get orders" });
    }
};
