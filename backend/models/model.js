const mongoose = require("mongoose");

const soundSchema = new mongoose.Schema({
  name: String,
  path: {
    type: String,
    require: true,
  },
  size: {
    type: Number,
    require: true,
  },
});

module.exports = new mongoose.model("Data", soundSchema);
