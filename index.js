const express = require("express");
const dotenv = require("dotenv");
const app = express();
const recording_route = require("./routes/recording-route");
const meeting_route = require("./routes/meeting-route");
dotenv.config();
app.use(express.json());
app.use("/recordings", recording_route);
app.use("/class", meeting_route);

app.listen(5000, () => {
  console.log("Hello server");
});
