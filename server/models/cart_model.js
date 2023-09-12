const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      selectedSize:{
        type:String,
        default:"L"
      }
    },
  ],
});

mongoose.model("CartModel", CartSchema);
