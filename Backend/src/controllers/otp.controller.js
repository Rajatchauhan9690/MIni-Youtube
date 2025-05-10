import OtpModel from "../models/user.otp.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rajatkchauhan8077@gmail.com",
    pass: "Rajat@8077chauhan",
  },
});

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await OtpModel.deleteMany({ email }); // Clear old OTPs

    await OtpModel.create({ email, otp, createdAt: new Date() });

    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await OtpModel.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    const isExpired = new Date() - new Date(record.createdAt) > 5 * 60 * 1000;
    if (isExpired) {
      await OtpModel.deleteOne({ _id: record._id });
      return res.status(400).json({ message: "OTP expired" });
    }

    await OtpModel.deleteOne({ _id: record._id });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "OTP verification failed", error: err.message });
  }
};
