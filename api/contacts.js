const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller/contacts");
const {
  createContactValidation,
  statusContactValidation,
} = require("../service/middlewares/validation");
const auth = require('../service/middlewares/auth')

router.get("/", auth, ctrlContact.get);

router.get("/:contactId", auth, ctrlContact.getById);

router.post("/", auth, createContactValidation, ctrlContact.create);

router.put("/:contactId", auth, createContactValidation, ctrlContact.update);

router.patch(
  "/:contactId/favorite", auth,
  statusContactValidation,
  ctrlContact.updateStatus
);

router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
