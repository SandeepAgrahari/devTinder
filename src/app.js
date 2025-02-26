const express = require("express");
const app = express();

const connectDB = require("./config/database");
const User = require("./models/User");

app.post("/signup", async (req, res) => {
  const dummyData = {
    firstName: "Sandeep",
    lastName: "Kumar",
    email: "sandeep@gmail.com",
    password: "Sandeep@123",
    age: 20,
    gender: "male",
  };
  try {
    const user = new User(dummyData);
    await user.save();
    res.send("User created successfully!");
  } catch (e) {
    res.status(400).send("Bad Request");
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
