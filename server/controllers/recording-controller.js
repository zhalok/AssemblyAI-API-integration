const path = require("path");
const axios = require("axios");
const fs = require("fs");
const recording_controller = {};
recording_controller.get_notification = (req, res, next) => {
  console.log(req.body);
};

recording_controller.upload_recording = (req, res, next) => {
  console.log(req.file);
  res.json("ok");
};

recording_controller.transcribe_notification = (req, res, next) => {
  console.log(req.body);
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "ba2fbd69707148a79fefaf70a848f377",
      "content-type": "application/json",
    },
  });
  assembly
    .get(`/transcript/${req.body.transcript_id}`)
    .then((res1) => {
      const words = res1.data.words;
      let speech = "";
      for (let i = 0; i < words.length; i++) {
        speech += words[i].text;
        speech += " ";
      }
      fs.writeFileSync(
        "/home/zhalok/Desktop/nodejs-zoomapi/server/recordings/speechs/speech.txt",
        speech,
        { encoding: "utf-8" }
      );
      res.end();
    })
    .catch((err) => {
      res.end();
      console.error(err);
    });
};
module.exports = recording_controller;
