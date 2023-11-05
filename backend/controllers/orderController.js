const orderModel = require("../models/orderModel");
require("dotenv").config();

const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("buyer")
      .populate("products");
    res.status(200).send({ success: true, message: "All Orders List", orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting orders",
      error,
    });
  }
};

module.exports = { getAllOrderController };
