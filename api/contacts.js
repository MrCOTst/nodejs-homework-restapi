const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller");
const {
  createContactValidation,
  statusContactValidation,
} = require(".//../service/validation/middleware");

router.get("/", ctrlContact.get);

router.get("/:contactId", ctrlContact.getById);

router.post("/", createContactValidation, ctrlContact.create);

router.put("/:contactId", createContactValidation, ctrlContact.update);

router.patch(
  "/:contactId/favorite",
  statusContactValidation,
  ctrlContact.updateStatus
);

router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
