const Notification = require('../models/Notification');

// GET notifications by user ID and model type
exports.getNotificationsByUser = async (req, res) => {
    const { userId } = req.params;
  const { role } = req.query; 

    try {
    if (!userId || !role) {
        return res.status(400).json({ message: 'User ID and role are required' });
    }

    const userModel = role === 'tasker' ? 'Tasker' : 'User';

    const notifications = await Notification.find({ userId, userModel }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
    } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
    }
};



// Send a notification to a topic
const { sendNotificationToTopic } = require("../utils/fcm");

exports.sendTopicNotificationController = async (req, res) => {
  const { topic, title, body } = req.body;

  if (!topic || !title || !body) {
    return res.status(400).json({ message: "Topic, title and body are required" });
  }

  try {
    await sendNotificationToTopic(topic, title, body); // send notification
    // Return a friendly message instead of raw Firebase response
    res.status(200).json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send notification", error: error.message });
  }
};
