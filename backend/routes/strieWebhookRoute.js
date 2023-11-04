const express = require("express");
const { stripeWebhookController } = require("../controllers/stripeController");

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookController
);

module.exports = router;
