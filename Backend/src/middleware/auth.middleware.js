
import jwt from "jsonwebtoken";
import User from "../models/user.js";

 async function userAuth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
         const { password, ...userData } = user;
    if (!user) {
      throw new Error("User not found");
    }

    req.user = userData;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export default userAuth;