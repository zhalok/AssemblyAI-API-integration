const express = require("express");
const router = express.Router();
const recording_controller = require("../controllers/recording-controller");
const path = require("path");
const multer = require("multer");

const upload = multer({
  limits: 50000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "recordings");
    },
    filename: (req, file, cb) => {
      const savedFile = file.originalname;
      cb(null, savedFile);
    },
  }),
});
router.post("/notification", recording_controller.get_notification);
router.post(
  "/upload",
  upload.single("recording"),
  recording_controller.upload_recording
);
module.exports = router;
