const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

async function connectDB() {
  await mongoose.connect(mongoURI);
}

module.exports = connectDB;
