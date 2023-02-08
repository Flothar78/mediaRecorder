const express = require("express");
const router = express.Router();
const Model = require("../models/model");
const multer = require("multer");
const uploadTeacher = multer({ dest: "sounds_teachers" });
const uploadLearner = multer({ dest: "sounds_learners" });
const path = require("path");
const { unlink } = require("fs");

router.get("/", async (req, res) => {
  Model.find()
    .then((sounds) => res.status(200).json(sounds))
    .catch((err) => res.status(400).json({ err }));
});

router.post(
  "/teacherVoice",
  uploadTeacher.single("teacherVoice"),
  async (req, res) => {
    const data = new Model({
      soundHexaRef: req.file.filename,
      path: Buffer.from(
        path.resolve(__dirname + "/../sounds_teachers/" + req.file.filename)
      ),
      size: req.file.size,
    });
    console.log(data);
    console.log(req.file);
    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.post("/learnerVoice", uploadLearner.single("learnerVoice"), (req) => {

  new Model({
    soundHexaRef: req.file.filename,
    path: Buffer.from(
      path.resolve(__dirname + "/../sounds_learners/" + req.file.filename)
    ),
    size: req.file.size,
  });
});

module.exports = router;
