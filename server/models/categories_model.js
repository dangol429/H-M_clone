const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  categories: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("CategoriesModel", CategoriesSchema);
