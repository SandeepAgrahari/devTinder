const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

async function connectDB() {
  await mongoose.connect(mongoURI);
}

module.exports = connectDB;
