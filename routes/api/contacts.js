const express = require("express");
const schemas = require("./schemas");
const middleware = require("./middleware");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const currentContacts = await listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: currentContacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const searchContact = await getContactById(contactId);
  if (!searchContact) {
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: searchContact,
  });
});

router.post("/", middleware(schemas.contactPOST), async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  if (!removedContact) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
    });
  }
  res.status(200).json({ message: "contact deleted", status: "success", code: 200 });
});

router.put(
  "/:contactId",
  middleware(schemas.contactPOST),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await updateContact(contactId, { name, email, phone });
    if (contact) {
      return res.status(200).json({
        contact,
        status: "success",
        code: 200,
      });
    }

    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  }
);

module.exports = router;
