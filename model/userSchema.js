const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  mobileNo: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  date: { type: String, default: Date },
  otp:String
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
