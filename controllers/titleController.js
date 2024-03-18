const titleModel = require("../model/titleSchema");

const titleController = async (req, res) => {
  try {
    let data = req.body;

    data.image = req.file.filename;
    let result = await titleModel.create(data);

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

const GetTitleData = async (req, res) => {
  try {
    let result = await titleModel.find();
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

const updateTitleData = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    await titleModel.findByIdAndUpdate(req.params._id, req.body);

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

const deleteTitleData = async (req, res) => {
  try {
    await titleModel.deleteOne(req.params);
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

module.exports = {
  titleController,
  GetTitleData,
  updateTitleData,
  deleteTitleData,
};
