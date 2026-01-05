import express from "express";
import {protect} from "../middleware/auth.middleware.js"

import SubscriptionController from "../controllers/subscription.js";

const router = express.Router();
router.post("/checkout", protect, SubscriptionController.createPayment);

export default router;
