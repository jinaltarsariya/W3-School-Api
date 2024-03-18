const subTitleModel = require("../model/subTitleSchema");

const subTitleController = async (req, res) => {
  try {
    let data = req.body;


    let imagesName = req.files.map((ele) => {
      return ele.filename;
    });

    data.images = imagesName;
    let result = await subTitleModel.create(data);

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

const getSubTitleData = async (req, res) => {
  try {
    let result = await subTitleModel.find().populate("title_id");
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

const updateSubTitleData = async (req, res) => {
  try {
    let imagesName = req.files.map((ele) => {
      return ele.filename;
    });

    req.body.images = imagesName;
    await subTitleModel.findByIdAndUpdate(req.params._id, req.body);

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

const deleteSubTitleData = async (req, res) => {
  try {
    await subTitleModel.deleteOne(req.params);
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

const findTitleData = async (req, res) => {
  try {
    let result = await subTitleModel.find({ title_id: req.params });
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
  subTitleController,
  getSubTitleData,
  updateSubTitleData,
  deleteSubTitleData,
  findTitleData,
};
