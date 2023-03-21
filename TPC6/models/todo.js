const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  owner: String,
  description: String,
  date: String,
  checked: Boolean,
});

module.exports = mongoose.model("todo", todoSchema);
