const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://sagrahari:eeejfeK5PwrXNupt@cluster0.8lvarsh.mongodb.net/devTinder"
  );
}

module.exports = connectDB;
