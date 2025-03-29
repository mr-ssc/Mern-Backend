const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed password in production
});

module.exports = mongoose.model("User", userSchema);
