const express = require("express");
const router = express.Router();
const upload = require("../multer");

const { userVarifyToken } = require("../middleware/UserAuthentication");

const {
  titleController,
  GetTitleData,
  updateTitleData,
  deleteTitleData,
} = require("../controllers/titleController");

router.post("/title", upload.single("image"), userVarifyToken, titleController);

router.get("/titleData", GetTitleData);

router.put(
  "/titleData/:_id",
  upload.single("image"),
  userVarifyToken,
  updateTitleData
);

router.delete("/titleData/:_id", userVarifyToken, deleteTitleData);

module.exports = router;
