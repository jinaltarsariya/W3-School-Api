const express = require("express");
const router = express.Router();
const upload = require("../multer");

const { userVarifyToken } = require("../middleware/UserAuthentication");

const {
  topicController,
  getTopicData,
  updateTopicData,
  deleteTopicData,
  findOneSubTitleData,
} = require("../controllers/topicController");

router.post(
  "/topic",
  upload.array("images", 12),
  userVarifyToken,
  topicController
);

router.get("/topicData", getTopicData);

router.put(
  "/topicData/:_id",
  upload.array("images", 12),
  userVarifyToken,
  updateTopicData
);

router.delete("/topicData/:_id", userVarifyToken, deleteTopicData);

router.get("/findOneSubTitleData/:_id", userVarifyToken, findOneSubTitleData);

module.exports = router;
