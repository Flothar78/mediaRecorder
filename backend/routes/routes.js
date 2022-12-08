const express = require("express");
const router = express.Router();
const Model = require("../models/model");
const multer = require("multer");
const upload = multer({ dest: "sounds" });
const fs = require("fs");
const path = require("path");
router.get("/", (req, res) => {
  res.send("Test route get/");
});



router.post("/post", upload.single("sound"), async (req, res) => {
  const data = new Model({
    name: req.file.fieldname,
    sound: fs.readFileSync(
      path.join(__dirname + "/../sounds/" + req.file.filename)
    ),
  });
  console.log(data);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  console.log(req.file);
});

// router.get("/getOne/:id", (req, res) => {
//   res.send(req.params.id);
// });

module.exports = router;
