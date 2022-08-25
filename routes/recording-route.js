const express = require("express");
const router = express.Router();
const recording_controller = require("../controllers/recording-controller");
router.post("/notification", recording_controller.get_notification);
module.exports = router;
