const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        product: { type: mongoose.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],

    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    payment_status: { type: String, required: true },
    delivery_status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const order = mongoose.model("order", orderSchema);

module.exports = order;
