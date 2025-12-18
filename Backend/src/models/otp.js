import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },

  otp: { type: String, required: true }, 
  purpose: {
    type: String,
    enum: ["password_reset","forgot_password","otp_send"],
    
  },

  used: {
    type: Boolean,
    default: false,
    index: true,
  },

  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
}, { timestamps: true });


 const OTP = mongoose.model("OTP", otpSchema);
 export default OTP