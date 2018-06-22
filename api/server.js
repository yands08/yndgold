"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const User = require("./models/userModel");
const Post = require("./models/postModel");
const { dbUrl } = require("./config.json");

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const { headers } = req;
  if (
    headers &&
    headers.authorization &&
    headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      headers.authorization.split(" ")[1],
      "SecretKeyForCarClubs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require("./routes/api");
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port);

console.log(`API server started on: ${port}`);

module.exports = app;
