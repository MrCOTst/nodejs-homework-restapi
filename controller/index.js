const service = require("../service");

const get = async (req, res, next) => {
  try {
    const currentContacts = await service.getAllContacts();
    res.status(200).json(currentContacts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const searchContact = await service.getContactById(contactId);
    if (searchContact) {
      res.status(200).json(searchContact);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favorite = false } = req.body;
  try {
    const newContact = await service.createContact({
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json(newContact);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const contact = await service.updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (contact) {
      return res.status(200).json(contact);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    if (req.body) {
      const contact = await service.updateContact(contactId, { favorite });
      if (contact) {
        return res.status(200).json(contact);
      }
    } else {
      res.status(400).json({
        message: `missing field favorite`,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const removedContact = await service.removeContact(contactId);
    if (removedContact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
