const path = require("path");

const recording_controller = {};
recording_controller.get_notification = (req, res, next) => {
  console.log(req.body);
};

recording_controller.upload_recording = (req, res, next) => {
  console.log(req.file);
  res.json("ok");
};
module.exports = recording_controller;
