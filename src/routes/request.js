const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " Connection Request Sent");
  } catch (e) {
    res.status(400).send("Bad Request! " + e.message);
  }
});

module.exports = requestRouter;
