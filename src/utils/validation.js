const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, email, password } = req.body;
  if (!firstName.length > 0) {
    throw new Error("First name is Required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = {
  validateSignUp,
};
