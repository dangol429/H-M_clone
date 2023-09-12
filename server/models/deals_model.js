const mongoose = require("mongoose");

const DealssSchema = new mongoose.Schema({
  Deals: [
    {
      Title: {
        type: String,
        required: true,
      },
      Deal: [
        {
          src: {
            type: String,
            required: true,
          },
          alt: {
            type: String,
            required: true,
          },
          redirect: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Deals = mongoose.model("DealsModel", DealssSchema);

module.exports = Deals;
