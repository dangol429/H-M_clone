const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("./verifyToken");
const CartModel = mongoose.model("CartModel");
const ProductModel = mongoose.model("ProductModel");

router.post("/add", verifyToken, async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;
  CartModel.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        // Cart does not exist for the user, create a new cart and add the product
        const newCart = new CartModel({ userId, ...req.body });
        newCart
          .save()
          .then(() => {
            ProductModel.findById(`${req.body.products[0].productId}`)
              .then((product) => {
                const cartId = newCart.products[0]._id;
                res.status(201).json({
                  products: {
                    ...product._doc,
                    ...req.body.products[0],
                    cartId: cartId,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: "Internal Server Error z" });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error z" });
          });
      } else {
        // Cart exists for the user, push the new product to the products array
        cart.products.push(...products);
        cart
          .save()
          .then(() => {
            ProductModel.findById(`${req.body.products[0].productId}`)
              .then((product) => {
                const cartId = cart.products[cart.products.length - 1]._id;
                console.log(cartId);
                res.status(200).json({
                  products: {
                    ...product._doc,
                    ...req.body.products[0],
                    cartId: cartId,
                  },
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error y" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error x" });
    });
});

router.get("/", verifyToken, async (req, res) => {
  const { id } = req.user;
  try {
    const cart = await CartModel.findOne({ userId: id });

    if (!cart) {
      // Cart does not exist for the user
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProducts = cart.products;

    // Extract the product IDs, selectedSize, and quantity from the cart products
    const productDetails = await Promise.all(
      cartProducts.map(async (product) => {
        const { productId, selectedSize, quantity } = product;
        
        const productData = await ProductModel.findOne({ _id: productId });

        if (!productData) {
          // Product with the provided ID does not exist
          return null;
          res.status(200).json({ message: "Product not found" });
        }
        
        const { _id } = product;
        return { ...productData._doc, selectedSize, quantity, cartId: _id };
      })
    );

    // Calculate the total price

    const totalPrice = productDetails.reduce(
      (acc, product) => acc + product?.price * product?.quantity,
      0
    );
    res.status(200).json({ products: productDetails, totalPrice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Get the cart item ID from the request parameters
  const { id: userId } = req.user; // Get the user ID from the authenticated user

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      // Cart does not exist for the user
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProducts = cart.products;

    // Find the index of the cart item with the provided ID
    const itemIndex = cartProducts.findIndex((product) => {
      console.log(product._id.toString());
      return product._id.toString() === id;
    });

    if (itemIndex === -1) {
      // Cart item with the provided ID does not exist
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Remove the cart item from the cart products array
    cartProducts.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Get the cart item ID from the request parameters
  const { id: userId } = req.user; // Get the user ID from the authenticated user

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      // Cart does not exist for the user
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProducts = cart.products;

    console.log(cart);
    // Find the index of the cart item with the provided ID
    const itemIndex = cartProducts.findIndex(
      (product) => product._id.toString() === id
    );

    if (itemIndex === -1) {
      // Cart item with the provided ID does not exist
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartProducts[itemIndex].quantity = req.body.quantity;
    cartProducts[itemIndex].selectedSize = req.body.selectedSize;
    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/", verifyToken, async (req, res) => {
  const { id } = req.user;
  try {
    const cart = await CartModel.findOne({ userId: id });
    if (!cart) {
      // Cart does not exist for the user
      return res.status(404).json({ message: "Cart not found" });
    }
    await CartModel.deleteOne({ userId: id });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
