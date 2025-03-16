const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age skills photoUrl about";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (connections.length === 0) {
      return res
        .status(404)
        .json({ message: "No connections found!", data: [] });
    }
    const userConnections = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "connections fetched Successfully",
      data: userConnections,
    });
  } catch (e) {
    res.status(400).send("Bad Request - " + e.message);
  }
});

module.exports = userRouter;
