const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../controller");
const ctrlWrapper = require("..//service/middlewares/ctrlWrapper");
const auth = require("../service/middlewares/auth");
const upload = require("../service/middlewares/upload");
const {
  userRegisterValidation,
  userLoginValidation,
  userSubscriptionValidation, verifyEmailValidation
} = require("../service/middlewares/validation");

router.post("/register", userRegisterValidation, ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", verifyEmailValidation, ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", userLoginValidation, ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  userSubscriptionValidation,
  ctrlWrapper(ctrl.updateSubscriptions)
);

router.patch("/avatars", auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
