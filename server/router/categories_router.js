const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const CategoriesModel = mongoose.model("CategoriesModel");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const newCategories = new CategoriesModel(req.body);
  try {
    const savedCategories = await newCategories.save();
    res.status(200).json(savedCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get All Categories
router.get("/", (req, res) => {
  CategoriesModel.find()
    .then((Categories) => {
      if(Categories === null){
        res.status(400).json("Not Found")
      }
      res.status(200).json(Categories[0]?.categories);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
