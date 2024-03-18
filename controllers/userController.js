const userModel = require("../model/userSchema");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createUserData = async (req, res) => {
  try {
    let data = req.body;

    if (!data.name || !data.email || !data.mobileNo || !data.password) {
      throw new Error("plz fill up all field !");
    }

    if (data.mobileNo.length < 10 || data.mobileNo.length > 10) {
      throw new Error("plz enter valid number !");
    }

    data.password = await bcrypt.hash(data.password, 10);
    data.date = moment(data.date).format("DD/MM/YYYY hh:mm:ss a");

    let result = await userModel.create(data);
    const token = jwt.sign({ id: result._id }, process.env.TOKEN_SECRET_KEY);

    res.status(201).json({
      status: true,
      msg: "data created successfully !",
      result: result,
      token: token,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const getUserData = async (req, res) => {
  try {
    let result = await userModel.find();

    res.status(200).json({
      status: true,
      msg: "data find!",
      result: result,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const userDataUpdate = async (req, res) => {
  try {
    let data = req.body;

    if (data.mobileNo.length < 10 || data.mobileNo.length > 10) {
      throw new Error("plz enter valid number !");
    }

    data.password = await bcrypt.hash(data.password, 10);
    let result = await userModel.findByIdAndUpdate(req.params, data);

    const token = jwt.sign({ id: result._id }, process.env.TOKEN_SECRET_KEY);

    res.status(200).json({
      status: true,
      msg: "data update successfully!",
      token: token,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const deleteUserData = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params);
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

const userLogin = async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      throw new Error("user not valid !");
    }

    let checkPassword = await bcrypt.compare(data.password, checkUser.password);

    if (!checkPassword) {
      throw new Error("password not valid !");
    }

    res.status(200).json({
      status: true,
      msg: "Login successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const generateOtp = async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      throw new Error("user not valid !");
    }

    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    await userModel.findByIdAndUpdate(checkUser._id, { $set: { otp: otp } });

    res.status(200).json({
      status: true,
      otp: otp,
      msg: "Otp generate successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const compareOtp = async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      throw new Error("user not valid !");
    }

    if (checkUser.otp !== data.otp) {
      throw new Error("Invalid OTP. Please check your code and try again.");
    }

    await userModel.findByIdAndUpdate(checkUser._id, { $set: { otp: "" } });

    res.status(200).json({
      status: true,
      msg: "Otp match successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      throw new Error("user not valid !");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error(" Passwords must match !");
    }
    data.password = await bcrypt.hash(data.password, 10);

    await userModel.findByIdAndUpdate(checkUser._id, {
      $set: { password: data.password },
    });

    res.status(200).json({
      status: true,
      msg: "password generated successfully !",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      msg: error.message,
    });
  }
};

module.exports = {
  createUserData,
  getUserData,
  userDataUpdate,
  deleteUserData,
  userLogin,
  generateOtp,
  compareOtp,
  forgetPassword,
};
