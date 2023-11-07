const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllOrderController,
  updateOrderStatusController,
} = require("../controllers/orderController");
const router = express.Router();

router.get("/get-order", requireSignIn, isAdmin, getAllOrderController);
router.put(
  "/update-order/:id",
  requireSignIn,
  isAdmin,
  updateOrderStatusController
);
module.exports = router;
