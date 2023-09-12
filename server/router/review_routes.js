const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const Review = mongoose.model("ReviewModel");
const ProductModel = mongoose.model("ProductModel");
// Create a new review
router.post("/", verifyToken, async (req, res) => {
  try {
    const { id: customerId } = req.user;
    const review = new Review({ ...req.body, customerId });
    await review.save();

    // Update the product model with the new review
    const productId = req.body.productId;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate new rating and total reviews
    const totalReviews = product.totalReviews + 1;
    const newRating =
      (product.rating * product.totalReviews + review.rating) / totalReviews;

    // Update product model
    product.rating = newRating;
    product.totalReviews = totalReviews;

    await product.save();

    res.status(201).json({ review, product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reviews for a specific product
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = (await Review.find({ productId })).reverse();

    if (reviews.length === 0) {
      throw new Error("No reviews found for the product");
    }

    res.json({ reviews });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get a specific review by ID
// router.get("/:reviewId", async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const review = await Review.findById(reviewId);
//     if (!review) {
//       throw new Error("Review not found");
//     }
//     res.json({ review });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// Update a review by ID
router.put("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updatedReview = req.body;

    const review = await Review.findByIdAndUpdate(reviewId, updatedReview, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      throw new Error("Review not found");
    }

    // Update product model with updated review
    const productId = review.productId;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Recalculate new rating based on all reviews
    const allReviews = await Review.find({ productId });
    const totalReviews = allReviews.length;
    let newRating = 0;

    if (totalReviews > 0) {
      const ratingsSum = allReviews.reduce((sum, r) => sum + r.rating, 0);
      newRating = ratingsSum / totalReviews;
    }

    // Update product model
    product.rating = newRating;
    product.totalReviews = totalReviews;
    await product.save();

    res.json({ review, product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a review by ID
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    console.log(reviewId);
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      throw new Error("Review not found");
    }

    // Update product model after review deletion
    const productId = review.productId;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Recalculate new rating based on remaining reviews
    const remainingReviews = await Review.find({ productId });
    const totalReviews = remainingReviews.length;
    let newRating = 0;

    if (totalReviews > 0) {
      const ratingsSum = remainingReviews.reduce((sum, r) => sum + r.rating, 0);
      newRating = ratingsSum / totalReviews;
    }

    // Update product model
    product.rating = newRating;
    product.totalReviews = totalReviews;
    await product.save();

    res.json({ message: "Review deleted successfully", product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
