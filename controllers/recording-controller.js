const recording_controller = {};
recording_controller.get_notification = (req, res, next) => {
  console.log(req.body);
};
module.exports = recording_controller;
