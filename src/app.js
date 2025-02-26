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

connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => {
      console.log("Server is listing on port:- 3000");
    });
  })
  .catch((e) => console.log("database can not be connected!"));
