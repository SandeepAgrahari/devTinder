const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User data is there!");
});

app.post("/user/login", (req, res) => {
  res.send("User Logged in successfully!");
});

app.get("/admin/getAllData", (req, res) => {
  console.log(123);
  res.send("Getting All Data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User Data is deleted!");
});

app.listen(3000, () => {
  console.log("Server is listing on port:- 3000");
});
