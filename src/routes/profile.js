const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { userAuth } = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!");
    }
    const decodeMessage = await jwt.verify(token, "DEV@Tinder#438");
    const userId = decodeMessage._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User is not found!");
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send("Bad Request " + e.message);
  }
});

module.exports = profileRouter;
