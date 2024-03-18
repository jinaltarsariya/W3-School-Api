const express = require("express");
const router = express.Router();

const {
  createUserData,
  getUserData,
  userDataUpdate,
  deleteUserData,
  userLogin,
  generateOtp,
  compareOtp,
  forgetPassword,
} = require("../controllers/userController");

const { userVarifyToken } = require("../middleware/UserAuthentication");

router.post("/user", createUserData);
router.get("/allUserData", getUserData);
router.put("/updateUser/:_id", userVarifyToken, userDataUpdate);
router.delete("/deleteUser/:_id", userVarifyToken, deleteUserData);
router.get("/user/login", userLogin);
router.get("/user/generateOtp", generateOtp);
router.get("/user/compareOtp", compareOtp);
router.get("/user/forgetPassword", forgetPassword);

module.exports = router;
