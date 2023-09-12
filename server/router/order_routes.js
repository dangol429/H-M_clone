const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("./verifyToken");
const order_model = require("../models/order_model");

const ProductModel = mongoose.model("ProductModel");
const Order = mongoose.model("OrderModel");
const User = mongoose.model("UserModel");
const nodemailer = require("nodemailer");
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order({ userId: req.user.id, ...req.body });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/getAllOrders", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate([
      {
        path: "userId",
        select: "email",
      },
      {
        path: "products.productId",
        select: "productName",
      },
    ]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate([
      {
        path: "userId",
        select: "email",
      },
    ]);

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.productId", "productName img brand categories")
      .lean();
    order.products = order.products.map((product) => ({
      productName: product.productId.productName,
      brand: product.productId.brand,
      img: product.productId.img,
      quantity: product.quantity,
      selectedSize: product.selectedSize,
      price: product.price,
    }));
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const user = await User.findById(updatedOrder.userId);

    // Check if the payment status is 'done' and then send an email
    if (updatedOrder.payment_status === "Paid") {
      const mailOptions = {
        from: process.env.GMAIL,
        to: user.email,
        subject: "Payment Successful",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #2ECC71;">Payment Confirmation - Order ID #${updatedOrder._id}</h1>
            <p>Dear ${user.fullName},</p>
            <p style="font-size: 16px;">We are delighted to inform you that your payment for Order #${updatedOrder._id} has been successfully processed. Thank you for choosing us for your purchase.</p>
            <p style="font-size: 16px;">Your order will be shipped as soon as possible.</p>
            <p style="font-size: 16px;">Your Shipping address:${updatedOrder.shipping_address.FullAddress}, Pincode: ${updatedOrder.shipping_address.PinCode}</p>
            <p style="font-size: 16px; color: #888;">If you have any questions or concerns regarding your order, please don't hesitate to contact our customer support team at <a href="mailto:help@markethub.com" style="color: #ff9900;">support@markethub.com</a> or <a href="tel:+1234567890" style="color: #ff9900;">+1 234-567-890</a>.</p>
            <p style="font-size: 16px;">Thank you for shopping with us. We look forward to serving you again in the future.</p>
            <p style="font-size: 16px; color: #555;">Best regards,<br><strong style="color: #ff3e6c;">MarketHub</strong></p>
          </div>
        </div> 
      `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await order_model.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
