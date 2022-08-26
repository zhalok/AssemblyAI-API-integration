const axios = require("axios");
const fs = require("fs");
const speech_processing = async (filepath) => {
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "ba2fbd69707148a79fefaf70a848f377",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  });

  try {
    const filepath =
      "/home/zhalok/Downloads/Wait For You - Elliott Yamin (Lyrics).mp4";
    const data = fs.readFileSync(filepath);
    // console.log(data);
    const response = await assembly.post("/upload", data);
    // console.log(response);
    const response1 = await assembly.post("/transcript", {
      audio_url: response.data.upload_url,
      webhook_url: "https://b6e0-27-147-226-247.ap.ngrok.io/recordings/webhook",
    });

    return response1.data;
  } catch (e) {
    console.log(e);
  }
};
speech_processing();
module.exports = speech_processing;
