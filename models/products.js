const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
