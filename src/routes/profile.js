const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Bad Request - Update is not allowed!");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    const updatedUser = await loggedInUser.save();
    if (updatedUser) {
      // res.send("User details udated successfully!");
      res.json({
        message: "User details updated successfully!",
        data: updatedUser,
      });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = profileRouter;
