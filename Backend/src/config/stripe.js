// import Razorpay from "razorpay";
// import { config } from "./env.js";

// const instance = new Razorpay({
//   key_id: config.razorpay.keyId,
//   key_secret: config.razorpay.keySecret
// });

// export default instance;
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
   apiVersion: "2025-12-15.clover"
});
export default stripe;
