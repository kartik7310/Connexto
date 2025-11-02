
import ConnectionService from "../services/connection.js";
import  AppError  from "../utils/AppError.js";
import logger from "../utils/logger.js";

const ConnectionController = {
  async sendConnectionRequest(req, res, next) {
    try {
      const fromUserId = req.user?._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (!fromUserId || !toUserId) {
        logger.warn("Missing user IDs in connection request");
        throw new AppError("User IDs are required", 400);
      }

      const reqObject = {
        FromUser: fromUserId,
        ToUser: toUserId,
        status,
      };

      const connectionRequest =
        await ConnectionService.createConnectionRequest(reqObject);

      res.status(201).json({
        success: true,
        message: "Connection request sent successfully",
        data: connectionRequest,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default ConnectionController;
