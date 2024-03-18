const topicModel = require("../model/topicSchema");

const topicController = async (req, res) => {
  try {
    let data = req.body;

    let storeImage = req.files.map((ele) => {
      return ele.filename;
    });

    data.images = storeImage;
    let result = await topicModel.create(data);

    res.status(201).json({
      status: true,
      msg: "data ctreated successfully !",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const getTopicData = async (req, res) => {
  try {
    let result = await topicModel.find().populate("subTitle_id");
    res.status(200).json({
      status: true,
      msg: "data find!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const updateTopicData = async (req, res) => {
  try {
    let storeImage = req.files.map((ele) => {
      return ele.filename;
    });

    req.body.images = storeImage;

    await topicModel.findByIdAndUpdate(req.params._id, req.body);

    res.status(200).json({
      status: true,
      msg: "data Updated successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const deleteTopicData = async (req, res) => {
  try {
    await topicModel.deleteOne(req.params);
    res.status(200).json({
      status: true,
      msg: "data deleted successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const findOneSubTitleData = async (req, res) => {
  try {
    let result = await topicModel.find({ title_id: req.params });
    res.status(200).json({
      status: true,
      msg: "data find!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

module.exports = {
  topicController,
  getTopicData,
  updateTopicData,
  deleteTopicData,
  findOneSubTitleData,
};
