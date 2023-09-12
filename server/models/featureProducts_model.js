const mongoose = require("mongoose");

const FeaturedProductsSchema = new mongoose.Schema({
  featuredProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductModel",
    required: true,
  }],
});

mongoose.model("FeaturedProductsModel", FeaturedProductsSchema);
