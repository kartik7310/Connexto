
import logger from "../config/logger.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.js";
import { config } from "../config/env.js";
import stripe from "../config/stripe.js";
import { sendPaymentReceiptEmail } from "../mails/paymentReceipt.js";
const SubscriptionController = {

async createPayment  (req, res,next) {
  try {
  const {_id:userId,email} = req.user;
    if (!userId) {
     return next(new AppError("User authentication required",401));
    }

    // Validate environment variables
    if (!config.stripe.stripePriceId) {
      return next(new AppError("Stripe price ID not configured",500));
    }
    const _id = userId
    const clientUrl = config.corsOrigin.split(',')[0].trim();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: config.stripe.stripePriceId,
          quantity: 1
        }
      ],
      success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cancel`,
      metadata: {
        userId: _id.toString()
      },
    });

    // Validate session URL exists
    if (!session.url) {
      return next(new AppError("Failed to create checkout session URL",500));
    }

    return res.json({ url: session.url });

  } catch (error) {
  logger.error("Payment creation error:", error);
    return next(new AppError("Failed to create payment session",500));
  }
},
 
   async stripeWebhook(req,res, next) {
      const signature = req.headers["stripe-signature"];
      if (!signature) {
        return next(new AppError("Missing stripe signature",400));
      }

      let event

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          config.stripe.webhookSecret
        );
          
      } catch (error) {
        console.error(" Webhook verification failed:", error);
        return next(new AppError("Invalid signature",400));
      }
      
      try {
        //  Subscription started
        if (event.type === "checkout.session.completed")
          {const session = event.data.object ;
      
      
      if (session.mode === "subscription" && session.metadata?.userId) {

        await User.updateOne(
          { _id: session.metadata.userId },
          {
            plan: "PREMIUM",
            subscriptionStatus: "active",
            stripeCustomerId: session.customer?.toString(),
            stripeSubscriptionId: session.subscription,
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        );

        // Send payment receipt email
        const amount = (session.amount_total / 100).toFixed(2);
        const currency = session.currency.toUpperCase();
        const receiptDetails = {
          amount: `${currency} ${amount}`,
          transactionId: session.id,
          date: new Date().toLocaleDateString()
        };

        try {
          await sendPaymentReceiptEmail(
            session.customer_details?.email || session.customer_email,
            session.customer_details?.name || "Premium User",
            receiptDetails
          );
        } catch (emailError) {
          logger.error("Failed to send payment receipt email:", emailError);
         
        }
      }
    }
        //  Subscription cancelled
      if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object ;

      await User.updateOne(
        { stripeSubscriptionId: subscription.id },
        {
          plan: "FREE",
          subscriptionStatus: "expired",
          $unset: {
            subscriptionStartDate: "",
            subscriptionEndDate: ""
          }
        }
      );
    }

        return res.json({ received: true });

      } catch (error) {
        console.error(" Webhook processing error:", error);
        return res.json({ received: true });
      }
    }
};

export default SubscriptionController;
