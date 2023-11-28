const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllOrderController,
  updateOrderStatusController,
  getUserOrderController,
} = require("../controllers/orderController");

const router = express.Router();

//get all orders
router.get("/get-order", requireSignIn, isAdmin, getAllOrderController);

//get a user's orders
router.get("/get-user-order/:pid", requireSignIn, getUserOrderController);

//update delivery status
router.put("/update-order/:id", requireSignIn, updateOrderStatusController);
module.exports = router;
