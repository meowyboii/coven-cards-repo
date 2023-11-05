const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { getAllOrderController } = require("../controllers/orderController");
const router = express.Router();

router.get("/get-order", requireSignIn, isAdmin, getAllOrderController);

module.exports = router;
