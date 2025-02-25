const express = require("express");

const app = express();

app.use("/hello/2", (req, res) => {
  res.send("Hello 2");
});

app.use("/hello", (req, res) => {
  res.send("Hello Namastey Page");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Sandeep", lastName: "Kumar" });
});

app.post("/user", (req, res) => {
  res.send("User Created Successfully!");
});

app.patch("/user", (req, res) => {
  res.send("User details Updated Successfully!");
});

app.delete("/user", (req, res) => {
  res.send("User deleted Successfully!");
});

app.use("/test", (req, res) => {
  res.send("Hello Test Page");
});

app.use("/", (req, res) => {
  res.send("Hello Express Home Page");
});

app.listen(3000, () => {
  console.log("Server is listing on port:- 3000");
});
