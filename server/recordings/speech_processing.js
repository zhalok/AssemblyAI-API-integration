const axios = require("axios");
const fs = require("fs");
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "ba2fbd69707148a79fefaf70a848f377",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});
const file = "/home/zhalok/Downloads/Wait For You - Elliott Yamin (Lyrics).mp4";
fs.readFile(file, (err, data) => {
  if (err) return console.error(err);

  assembly
    .post("/upload", data)
    .then((res) => {
      assembly
        .post("/transcript", {
          audio_url: res.data.upload_url,
          webhook_url:
            "https://0c82-27-147-226-247.in.ngrok.io/recordings/webhook",
        })
        .then((res1) => console.log(res.data))
        .catch((e) => console.log(e));
    })
    .catch((err) => console.error(err));
});
