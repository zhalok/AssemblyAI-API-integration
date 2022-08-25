const express = require("express");
const dotenv = require("dotenv");
const app = express();
const recording_route = require("./routes/recording-route");
dotenv.config();

app.use("/recordings", recording_route);

app.listen(5000, () => {
  console.log("Hello server");
});
