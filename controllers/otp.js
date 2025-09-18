const Otp = require("../models/Otp");
const { generateOTP, sendOTP } = require("../utils/otp");

exports.sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();

    const otpDoc = new Otp({
      phoneNumber,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    await otpDoc.save();
    await sendOTP(phoneNumber, otp);

    res.status(201).json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const otpDoc = await Otp.findOne({ phoneNumber, otp });

    if (!otpDoc) return res.status(400).json({ message: "Invalid OTP" });
    if (otpDoc.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await Otp.deleteMany({ phoneNumber });

    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
