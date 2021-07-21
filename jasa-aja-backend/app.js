const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./api/routes/user");
const serviceRoutes = require("./api/routes/service");
const url = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.vx0y0.mongodb.net/JasaAjaDatabase?retryWrites=true&w=majority`;
const fs = require("fs");
const path = require("path");
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
// mongoose.Promise = global.Promise;
// app.use(morgan("dev"));
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({}));
app.use((res, req, next) => {
  // allow Cross Origin (different server between client and server)
  res.header("Access-Control-Allow-Origin", "*"); // * mean all websites. you can change * with specific url
  res.header(
    // define which header's types that are allowed
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    // http verbs allowed.
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/images/uploads/:filename", async (req, res, next) => {
  res.set({ "Content-Type": "image/png" });
  const filename = req.params.filename;
  res.sendFile(`${__dirname}/uploads/${filename}`);
});
app.use("/user", userRoutes);
app.use("/service", serviceRoutes);

module.exports = app;
