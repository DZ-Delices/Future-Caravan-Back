const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS
async function sendOTP(phone, otp) {
  try {
    await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log("✅ OTP sent to", phone);
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    throw new Error("Failed to send OTP");
  }
}

module.exports = { generateOTP, sendOTP };
