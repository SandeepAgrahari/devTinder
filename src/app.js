const express = require("express");
const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something is wrong!");
  }
});
app.get("/user/data", (req, res) => {
  try {
    throw new Error("SOmething is wrong!");
  } catch (e) {
    res.status(500).send("Error is coming!");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something is wrong!");
  }
});
app.listen(3000, () => {
  console.log("Server is listing on port:- 3000");
});
