import mongoose, { Schema } from "mongoose";

const OtpSchema = new Schema(
  {
    email: String,
    otp: String,
    createdAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("OtpModel", OtpSchema);
