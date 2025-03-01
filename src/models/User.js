const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "First name must contains atleast 4 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
      required: true,
      unique: [true, " Email is already there in system!"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password should contains at-least 6 characters"],
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      validate: (value) => {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
      trim: true,
    },
    about: {
      type: String,
      maxLength: [200, "Max allowed characters for this section is 200."],
      trim: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
