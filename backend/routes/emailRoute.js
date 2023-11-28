const express = require("express");
const { sendEmailController } = require("../controllers/emailController");

const router = express.Router();

router.post("/send-message", sendEmailController);

module.exports = router;
