const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required:true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        selectedSize: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
    total_amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    payment_status: { type: String, default: "Pending" },
    shipping_address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", OrderSchema);
