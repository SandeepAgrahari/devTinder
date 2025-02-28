const express = require("express");
const app = express();

const connectDB = require("./config/database");
const User = require("./models/User");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully!");
  } catch (e) {
    res.status(400).send("Bad Request");
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    console.log(user);
    if (!user) {
      res.status(404).send("No User found with given data");
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send("Bad Request!");
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
