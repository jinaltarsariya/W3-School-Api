const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subTitleSchema = new Schema({
  title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "title",
  },
  name: String,
  images: [String],
});

const subTitleModel = mongoose.model("subTitle", subTitleSchema);

module.exports = subTitleModel;
