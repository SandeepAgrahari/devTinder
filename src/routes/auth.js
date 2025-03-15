const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { validateSignUp } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { firstName, lastName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.send("User created successfully!");
  } catch (e) {
    res.status(400).send("Bad Request" + e.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email is Required!");
    }
    if (!password) {
      throw new Error("Password is Required!");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credential!");
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      let token = await user.getJwt();
      res.cookie("token", token, { expires: nextDay });
      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credential!");
    }
  } catch (e) {
    res.status(400).send("Bad Request" + e.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull!");
});

module.exports = authRouter;
