const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  servicePicture: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isPromoted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
