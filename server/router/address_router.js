const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const AddressModel = mongoose.model("AddressModel");

// Add or Update Address
router.post("/add", verifyToken, async (req, res) => {
  const { Name, MobileNumber, PinCode, FullAddress } = req.body;
  const { id: userId } = req.user;

  try {
    let addressModel = await AddressModel.findOne({ userId });

    if (addressModel) {
      // If user already has an address, update it
      addressModel.address = { Name, MobileNumber, PinCode, FullAddress };
    } else {
      // If user doesn't have any address, create a new document
      addressModel = new AddressModel({
        userId,
        address: { Name, MobileNumber, PinCode, FullAddress },
      });
    }

    const savedAddress = await addressModel.save();
    res.status(200).json(savedAddress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", verifyToken, (req, res) => {
  const { id: userId } = req.user;

  AddressModel.findOne({ userId })
    .then((address) => {
      res.status(200).json(address);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
