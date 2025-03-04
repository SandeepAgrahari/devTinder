const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { validateSignUp } = require("./utils/validation");
const connectDB = require("./config/database");
const User = require("./models/User");

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
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      let token = await jwt.sign({ _id: user._id }, "DEV@Tinder#438");
      res.cookie("token", token);
      res.send("Login Successfully!");
    } else {
      throw new Error("Invalid Credential!");
    }
  } catch (e) {
    res.status(400).send("Bad Request" + e.message);
  }
});

app.get("/profile", (req, res) => {
  try {
    console.log(req.cookies);
  } catch (e) {
    res.status(400).send("Bad Request " + e.message);
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    // const user = await User.findById("67bf03a06651d55219f784df");
    if (!user) {
      res.status(404).send("No user found with given email!");
    } else {
      res.send(user);
    }
    // const users = await User.find({ email: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("No user found with given email!");
    // } else {
    //   res.send(users);
    // }
  } catch (e) {
    res.status(400).send("Bad Request!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    if (users.length === 0) {
      res.send("No Users are there in Database");
    } else {
      res.send(users);
    }
  } catch (e) {
    res.status(400).send("Bad Request!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const UPDATE_ALLOWED = ["age, skills, lastName, photoUrl, gender, about"];
    const isAllowed = Object.keys(data).every((key) =>
      UPDATE_ALLOWED.includes(key)
    );
    if (!isAllowed) {
      throw new Error("Update is not allowd ");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more then 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("No User found with given data");
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send("Bad Request! " + e.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("No userr found!");
    } else {
      res.send("User deleted Successfully!");
    }
  } catch (e) {
    res.status(400).send("Bad Request!");
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
