const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
  },
  ktpNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  dob: {
    type: Date,
  },
  role: {
    type: String,
    default: "pelanggan",
  },
});

module.exports = mongoose.model("User", userSchema);
