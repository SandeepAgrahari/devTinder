const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(7070, () => {
      console.log("Server is listing on port:- 3000");
    });
  })
  .catch((e) => console.log("database can not be connected!", e.message));
