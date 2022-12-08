const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  sound: {
    type: String,
    require: true,
  },
});

module.exports = new mongoose.model("Data", imageSchema);
