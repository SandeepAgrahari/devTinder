const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Namastey Page");
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
