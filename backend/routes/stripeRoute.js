const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const {
  stripeController,
  stripeWebHookController,
} = require("../controllers/stripeController");

const router = express.Router();

router.post("/create-checkout-session", requireSignIn, stripeController);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHookController
);
module.exports = router;
