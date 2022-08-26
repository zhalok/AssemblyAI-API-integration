const path = require("path");
const axios = require("axios");
const fs = require("fs");
const speech_processing = require("../utils/speech_processing");
const { response } = require("express");
const recording_controller = {};
recording_controller.get_notification = (req, res, next) => {
  console.log(req.body);
};

recording_controller.upload_recording = async (req, res, next) => {
  let recording_data = fs
    .readFileSync(
      "/home/zhalok/Desktop/nodejs-zoomapi/server/.data/recordings.json"
    )
    .toString();
  recording_data = JSON.parse(recording_data);
  const new_recording_data = {
    file_id: req.file.filename.split(".")[0],
    class_id: req.body.class_id,
  };
  recording_data.push(new_recording_data);
  fs.writeFileSync(
    "/home/zhalok/Desktop/nodejs-zoomapi/server/.data/recordings.json",
    JSON.stringify(recording_data)
  );
  const recording_path =
    "/home/zhalok/Desktop/nodejs-zoomapi/server/recordings/video/" + req.file;
  speech_process_response = await speech_processing(recording_path);
  let speech_data = fs
    .readFileSync(
      "/home/zhalok/Desktop/nodejs-zoomapi/server/.data/speechs.json"
    )
    .toString();
  speech_data = JSON.parse(speech_data);
  const new_speech_data = {
    speech_id: speech_process_response.id,
    class_id: req.body.class_id,
  };
  speech_data.push(new_speech_data);
  fs.writeFileSync(
    "/home/zhalok/Desktop/nodejs-zoomapi/server/.data/speechs.json",
    JSON.stringify(speech_data)
  );
  res.json("ok");
};

recording_controller.transcribe_notification = (req, res, next) => {
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
        `/home/zhalok/Desktop/nodejs-zoomapi/server/recordings/speechs/${req.body.transcript_id}.txt`,
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
