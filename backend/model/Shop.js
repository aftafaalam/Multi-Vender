const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phoneNumber!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address!"],
  },
  zipCode: {
    type: String,
    required: [true, "Please enter your zipCode!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "seller",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//  compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
