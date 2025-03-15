const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;

      //Check if status is either ignored or interested
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error(`${status} is not a valid status value`);
      }

      //Check if user is present in db to whome connection request is sending
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res
          .status(404)
          .send("User to whom connection request is sending does not exist");
      }

      // check if request is already sent from-to or to-from
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(409).send("Request is already being sent/exit!");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const newAddedRequest = await connectionRequest.save();
      if (newAddedRequest) {
        const message =
          status === "ignored"
            ? `${fromUserId} ignored ${toUserId}`
            : `${fromUserId} is interested in ${toUserId}`;
        res.json({
          message,
          data: newAddedRequest,
        });
      }
    } catch (e) {
      res.status(400).send("Bad Request! " + e.message);
    }
  }
);

module.exports = requestRouter;
