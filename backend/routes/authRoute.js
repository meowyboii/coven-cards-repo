const express = require("express");
const {
  registerController,
  loginController,
  testController,
  getAllUsersController,
} = require("../controllers/authController.js");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");

//router object
const router = express.Router();

//register || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//get users route
router.get("/get-users", requireSignIn, isAdmin, getAllUsersController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
