const express = require("express");
const app = express();
const cors = require("cors");
const uploadRouter = require("./routes/api/Uploads");
const path = require("path");

app.use(cors());
app.use("/static", express.static(path.join(__dirname + "/uploadedFiles/")));
app.use(express.json());
app.use("/", uploadRouter);

app.listen(9091, () => {
  console.log("Server Started on 9091");
});
