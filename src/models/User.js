const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "First name must contains atleast 4 characters"],
      maxLength: [20, "First name should be maximum 20 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: [4, "Last name must contains atleast 4 characters"],
      maxLength: [20, "Last name should be maximum 20 characters"],
    },
    email: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid" + value);
        }
      },
      required: true,
      lowercase: true,
      unique: [true, " Email is already there in system!"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter string password!");
        }
      },
    },
    age: {
      type: Number,
      min: [18, "Age can not be less then 18"],
      max: [80, "Age can not be less then 80"],
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
      maxLength: [100, "Max allowed characters for this section is 200."],
      trim: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordEnteredByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordEnteredByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
