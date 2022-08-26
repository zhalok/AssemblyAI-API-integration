const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const recording_route = require("./routes/recording-route");
const meeting_route = require("./routes/meeting-route");
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow_Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
app.use("/recordings", recording_route);
app.use("/class", meeting_route);

app.listen(5000, () => {
  console.log("Hello server");
});
