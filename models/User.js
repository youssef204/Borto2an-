const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = (v) => {
  if (!v.includes("@")) return false;
  let arr = v.split("@");
  if (!arr[1].includes(".")) return false;
  return true;
};

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validateEmail,
      message: `{VALUE} is not in the form of a mail`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
