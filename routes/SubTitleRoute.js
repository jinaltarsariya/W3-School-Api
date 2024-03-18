const express = require("express");
const router = express.Router();
const upload = require("../multer");

const { userVarifyToken } = require("../middleware/UserAuthentication");

const {
  subTitleController,
  getSubTitleData,
  updateSubTitleData,
  deleteSubTitleData,
  findTitleData,
} = require("../controllers/subTitleController");

router.post(
  "/subTitle",
  upload.array("images", 12),
  userVarifyToken,
  subTitleController
);

router.get("/subTitleData", getSubTitleData);

router.put(
  "/subTitleData/:_id",
  upload.array("images", 12),
  userVarifyToken,
  updateSubTitleData
);

router.delete("/subTitleData/:_id", userVarifyToken, deleteSubTitleData);

router.get("/findTitleData/:_id", userVarifyToken, findTitleData);

module.exports = router;
