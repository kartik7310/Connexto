import express from "express";
import {protect} from "../middleware/auth.middleware.js"
import ConnectionController from "../controllers/connectionRequest.js";
const router = express.Router();
router.post("/request/send/:status/:toUserId", protect, ConnectionController.sendConnectionRequest);


export default router;
