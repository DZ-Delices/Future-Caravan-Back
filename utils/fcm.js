const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Send notification to a single device token
const sendNotificationToToken = async (token, title, body, data = {}) => {
  const message = {
    notification: { title, body },
    token, // device token
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent to token:", response);
    return response;
  } catch (error) {
    console.error("❌ FCM Error (token):", error.message);
    throw error;
  }
};

// Send notification to a topic
const sendNotificationToTopic = async (topic, title, body, data = {}) => {
  const message = {
    notification: { title, body },
    topic, // topic name
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(`✅ Notification sent to topic "${topic}":`, response);
    return response;
  } catch (error) {
    console.error("❌ FCM Error (topic):", error.message);
    throw error;
  }
};

module.exports = { sendNotificationToToken, sendNotificationToTopic };
