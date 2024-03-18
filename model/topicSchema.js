const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "title",
  },
  subTitle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subTitle",
  },
  images: [String],
  name: String,
  discription: String,
});

const topicModel = mongoose.model("topic", topicSchema);

module.exports = topicModel;
