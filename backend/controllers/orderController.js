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

const getUserOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.params.pid })
      .sort({ createdAt: -1 })
      .populate({
        path: "products.product",
        model: "product",
        select: "name amountSale _id",
      });
    res
      .status(200)
      .send({ success: true, message: "All User Orders List", orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user orders",
      error,
    });
  }
};

const updateOrderStatusController = async (req, res) => {
  try {
    const { delivery_status } = req.body;
    const { id } = req.params;
    const order = await orderModel.findByIdAndUpdate(
      id,
      { delivery_status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Delivery Status Updated Successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating order status",
      error,
    });
  }
};

module.exports = {
  getAllOrderController,
  updateOrderStatusController,
  getUserOrderController,
};
