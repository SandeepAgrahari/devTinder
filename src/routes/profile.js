const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { userAuth } = require("../middleware/auth");
const {
  validateProfileEditData,
  validateChangePasswordData,
} = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Invalid Token!");
    }
    const decodeMessage = await jwt.verify(token, process.env.JWT_SECRET_KEY);
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
      res.json({
        message: "User details updated successfully!",
        data: updatedUser,
      });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateChangePasswordData(req)) {
      throw new Error("Bad Request - Password can't be change!");
    }
    const loggedInUser = req.user;
    const isValidCurrentPassword = await loggedInUser.validatePassword(
      req.body.currentPassword
    );
    if (!isValidCurrentPassword) {
      throw new Error("Invalid Password!");
    }
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      throw new Error("New password and confirm new password is not same!");
    }
    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser["password"] = hashPassword;
    const updatedUser = await loggedInUser.save();
    if (updatedUser) {
      res.send("Password changes successfully!");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = profileRouter;
