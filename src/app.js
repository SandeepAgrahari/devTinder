const express = require("express");

const app = express();

// app.use("/hello/2", (req, res) => {
//   res.send("Hello 2");
// });

//This will not run for /route path. but if we use app.use() then it will also run for /route path
// Express => Execure middleware chain => untill it reaches to Request handler where we return the response
app.use("/", (req, res, next) => {
  console.log("Hello");
  next();
});

app.get(
  "/route",
  (req, res, next) => {
    console.log("1st console");
    next();
  },
  (req, res) => {
    console.log("2nd consoole");
    res.send("2nd Response");
  }
);

app.get("/hello/:userId/:blogId", (req, res) => {
  //   console.log(req.query);
  //   console.log(req.params);
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

// app.use(/.*fly$/, (req, res) => {
//   res.send("Hello Test Page");
// });

// app.use("/", (req, res) => {
//   res.send("Hello Express Home Page");
// });

app.listen(3000, () => {
  console.log("Server is listing on port:- 3000");
});
