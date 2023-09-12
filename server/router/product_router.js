//get All Products
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ProductModel = mongoose.model("ProductModel");

router.get("/", (req, res) => {
    const categoriesParam = req.query.Categories;
    const searchQuery = req.query.search;
    const categories = categoriesParam ? categoriesParam.split(",") : [];
    const filter = {};
  
    if (categories.length > 0) {
      // Add a filter for categories
      filter.categories = { $in: categories };
    }
    if (searchQuery) {
      filter.$text = { $search: searchQuery };
    }
    ProductModel.find(filter)
      .then((products) => {
        res.status(200).json(products.reverse());
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  
  // find One Product
router.get("/:id", (req, res) => {
  ProductModel.findById(req.params.id)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});


  module.exports = router;