import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  
    email: { type: String, required: true },
    otp: { type: String, required: true },
   
    otpCreatedAt: {
      type: Date,
      default: Date.now,
      expires: 300, 
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000), 
    },

});

export const OTP = mongoose.model("OTP", otpSchema);