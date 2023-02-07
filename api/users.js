const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../controller");
const ctrlWrapper = require("..//service/middlewares/ctrlWrapper");
const auth = require("../service/middlewares/auth");
const {
  userRegisterValidation,
  userLoginValidation,
  userSubscriptionValidation,
} = require("../service/middlewares/validation");

router.post("/register", userRegisterValidation, ctrlWrapper(ctrl.register));

router.post("/login", userLoginValidation, ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  userSubscriptionValidation,
  ctrlWrapper(ctrl.updateSubscriptions)
);

module.exports = router;
