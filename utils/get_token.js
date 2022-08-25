const fs = require("fs");
const get_token = () => {
  const bufferData = fs.readFileSync(
    "/home/zhalok/Desktop/nodejs-zoomapi/.data/token_file.json"
  );
  const sdata = bufferData.toString();
  const data = JSON.parse(sdata);
  const token = data.access_token;
  return token;
};

module.exports = get_token;
