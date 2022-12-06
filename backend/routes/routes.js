const express = require("express");
const router = express.Router();
//const Model = require("../models/model");
module.exports = router;

router.get("/", (req, res) => {
  res.send("Test route get/");
});

router.get("/getOne/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("/post", (req, res) => {
  console.log(req.body.value);
  console.log(req.file);
});

// router.post("/post", async (req, res) => {
//   const data = new Model({
//     name: req.body.name,
//     age: req.body.age,
//   });
//
//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
