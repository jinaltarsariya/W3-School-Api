const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const titleSchema = new Schema({
  name: String,
  image: String,
});

const titleModel = mongoose.model("title", titleSchema);

module.exports = titleModel;
