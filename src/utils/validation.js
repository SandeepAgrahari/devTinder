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

const validateProfileEditData = (req) => {
  if (!req?.body || Object.keys(req.body).length === 0) {
    throw new Error("Request body should not be empty!");
  }
  const allowedFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "gender",
    "about",
    "photoUrl",
    "skills",
  ];
  const isUpdateAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isUpdateAllowed;
};

const validateChangePasswordData = (req) => {
  if (!req?.body || Object.keys(req.body).length === 0) {
    throw new Error("Request body should not be empty!");
  }
  const allowedFields = [
    "currentPassword",
    "newPassword",
    "confirmNewPassword",
  ];
  const isUpdateAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isUpdateAllowed;
};

module.exports = {
  validateSignUp,
  validateProfileEditData,
  validateChangePasswordData,
};
