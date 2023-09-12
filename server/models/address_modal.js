const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  address: {
    Name: {
      type: String,
      required: true,
    },
    MobileNumber: {
      type: String,
      required: true,
    },
    PinCode: {
      type: String,
      required: true,
    },
    FullAddress: {
      type: String,
      required: true,
    },
  },
});

mongoose.model("AddressModel", AddressSchema);
