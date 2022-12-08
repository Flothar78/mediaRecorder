const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  sound: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("Data", imageSchema);
