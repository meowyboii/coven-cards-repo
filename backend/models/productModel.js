const mongoose = require("mongoose");

// Create a photo schema
const photoSchema = new mongoose.Schema({
  filename: String,
  description: String,
  path: String,
});
const Photo = mongoose.model("Photo", photoSchema);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    saleRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
