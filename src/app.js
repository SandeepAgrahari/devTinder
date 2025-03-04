const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { validateSignUp } = require("./utils/validation");
const connectDB = require("./config/database");
const User = require("./models/User");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
      let token = await user.getJwt();
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600) });
      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credential!");
    }
  } catch (e) {
    res.status(400).send("Bad Request" + e.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
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

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " Connection Request Sent");
  } catch (e) {
    res.status(400).send("Bad Request! " + e.message);
  }
});
connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => {
      console.log("Server is listing on port:- 3000");
    });
  })
  .catch((e) => console.log("database can not be connected!"));
