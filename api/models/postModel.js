"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Post Schema
const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    default: "Untitled"
  },

  body: {
    type: String,
  },

  created: {
    type: Date,
    default: Date.now
  },

  picture: {
    type: String,
    default: "https://getuikit.com/docs/images/light.jpg"
  }
});

mongoose.model("Post", PostSchema);
