const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const userModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const digits = "0123456789";
let otp = "";

for (let i = 0; i < 4; i++) {
  otp += digits[Math.floor(Math.random() * 10)];
}

router.get("/", (req, res) => {
  res.render("SignUpPage");
});
5;

router.post("/signUp", async (req, res) => {
  try {
    let data = req.body;

    if (!data.name || !data.email || !data.mobileNo || !data.password) {
      res.render("ThrowError");
    } else {
      data.password = await bcrypt.hash(
        data.password,
        process.env.PASSWORD_SALT
      );
      data.date = moment(data.date).format("DD/MM/YYYY hh:mm:ss a");
      let result = await userModel.create(data);
      let token = jwt.sign({ id: result._id }, process.env.TOKEN_SECRET_KEY);
      console.log("token --> ", token);
    }
    res.redirect("/");
  } catch (error) {}
});

router.get("/login", (req, res) => {
  res.render("LogInPage");
});

router.post("/login", async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      res.render("UserNotValid");
    }

    let checkPassword = await bcrypt.compare(data.password, checkUser.password);

    if (!checkPassword) {
      res.render("PassNotValid");
    }

    res.render("DataValid");
  } catch (error) {}
});

router.get("/views/GenerateOtp.ejs", (req, res) => {
  res.render("GenerateOtp");
});

router.post("/views/GenerateOtp.ejs", async (req, res) => {
  try {
    let data = req.body;

    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      res.send("user not valid !");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jinaltarsariya2002@gmail.com",
        pass: "dylhnzyntdrdvqlw",
      },
    });

    await transporter.sendMail({
      from: "jinaltarsariya2002@gmail.com",
      to: data.username,
      subject: "Verification Code !",
      html:
        "<h2>OTP for account verification is :- </h2>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>",
    });

    await userModel.findByIdAndUpdate(checkUser._id, {
      $set: { otp: otp },
    });

    res.send("verification code sent succesffully !");
  } catch (error) {}
});

router.get("/views/EnterOtp.ejs", async (req, res) => {
  res.render("EnterOtp");
});

router.post("/views/EnterOtp.ejs", async (req, res) => {
  try {
    let data = req.body;

    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      res.send("user not valid !");
    }
    if (checkUser.otp !== data.otp) {
      res.send("Invalid OTP. Please check your code and try again.");
    }

    await userModel.findByIdAndUpdate(checkUser._id, { $set: { otp: "" } });

    res.send("verification successfully !");
  } catch (error) {}
});

router.get("/views/ForgotPassword.ejs", (req, res) => {
  res.render("ForgotPassword");
});

router.post("/views/ForgotPassword.ejs", async (req, res) => {
  try {
    let data = req.body;
    let checkUser = await userModel.findOne({
      $or: [{ email: data.username }, { mobileNo: data.username }],
    });

    if (!checkUser) {
      res.send("user not valid !");
    }

    if (data.password !== data.confirmPassword) {
      res.send(" Passwords must match !");
    }

    data.password = await bcrypt.hash(data.password, process.env.PASSWORD_SALT);

    await userModel.findByIdAndUpdate(checkUser._id, {
      $set: { password: data.password },
    });
    res.send("password generated successfully !");
  } catch (error) {}
});

module.exports = router;
