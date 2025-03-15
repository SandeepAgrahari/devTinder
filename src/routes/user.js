const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age skills photoUrl about");
    if (connectionRequests) {
      res.json({
        message: "data fetched successfully",
        data: connectionRequests,
      });
    }
  } catch (e) {
    res.status(400).send(`Error:- ${e.message}`);
  }
});

module.exports = userRouter;
