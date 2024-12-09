const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  membership_type: {
    type: String,
    enum: ["Regular", "Premium"],
    required: true,
  },
  registered_date: { type: Date, default: Date.now },
  token: { type: String, required: false },
});

module.exports = mongoose.model("User", user);
