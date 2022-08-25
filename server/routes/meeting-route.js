const express = require("express");
const router = express.Router();
const meeting_route_controller = require("../controllers/meeting-route-controller");
router.post("/create", meeting_route_controller.create_meeting);
module.exports = router;
