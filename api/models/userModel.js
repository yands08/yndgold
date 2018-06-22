"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },

  hash_password: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  picture: {
    type: String,
    default: "https://getuikit.com/docs/images/avatar.jpg"
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model("User", UserSchema);
