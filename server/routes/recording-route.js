const express = require("express");
const router = express.Router();
const recording_controller = require("../controllers/recording-controller");
const path = require("path");
const { v4: uuid4 } = require("uuid");

const multer = require("multer");

const upload = multer({
  limits: 50000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "recordings/videos");
    },
    filename: (req, file, cb) => {
      console.log(req.body);
      const savedFile = uuid4() + "." + file.mimetype.split("/")[1];
      cb(null, savedFile);
    },
  }),
});

router.post("/webhook", recording_controller.transcribe_notification);
router.post(
  "/upload",
  upload.single("recording"),
  recording_controller.upload_recording
);
module.exports = router;
