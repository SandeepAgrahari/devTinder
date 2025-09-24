const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Invalid Token!");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("Bad Request- " + e.message);
  }
};

module.exports = {
  userAuth,
};
