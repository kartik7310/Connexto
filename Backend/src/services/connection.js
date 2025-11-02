import ConnectionRequest from "../models/connectionRequest.js";
import logger from "../config/logger.js";
import AppError from "../utils/AppError.js";
import User from "../models/user.js";
const ConnectionService = {
  async createConnectionRequest(reqObject) {

    
    const { FromUser, ToUser, status } = reqObject;

    const allowedStatus = ["ignored", "interested", "accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      logger.warn(`Invalid status type: ${status}`);
      throw new AppError("Invalid status type", 400);
    }

    try {
     
      const toUser = await User.findById(ToUser).select("-password");

      if (!toUser) {
        logger.warn(`Target user not found: ${ToUser}`);
        throw new AppError("Target user not found", 404);
      }
      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: FromUser, toUserId: ToUser },
          { fromUserId: ToUser, toUserId: FromUser },
        ],
      });

      if (existingConnection) {
        logger.warn(
          `Connection request already exists between ${FromUser} and ${ToUser}`
        );
        throw new AppError("Connection request already exists", 400);
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId: FromUser,
        toUserId: ToUser,
        status,
      });

      await connectionRequest.save();

      logger.info(
        `Connection request created from ${FromUser} → ${ToUser} with status: ${status}`
      );

      return connectionRequest;
    } catch (error) {
      logger.error("Error creating connection request", { error });
      throw new AppError(
        error.message || "Failed to create connection request",
        error.statusCode || 500
      );
    }
  },
};

export default ConnectionService;
