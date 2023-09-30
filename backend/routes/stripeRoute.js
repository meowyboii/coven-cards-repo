const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const stripeController = require("../controllers/stripeController");

const router = express.Router();

router.post("/create-checkout-session", requireSignIn, stripeController);

module.exports = router;
