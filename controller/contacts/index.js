const service = require("../../service/contactActions");

const get = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  try {
    const currentContacts = await service.getAllContacts(
      _id,
      skip,
      limit,
      favorite
    );
    res.status(200).json(currentContacts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  console.log("_id:", _id);
  try {
    const searchContact = await service.getContactById(contactId, _id);
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
  const { _id } = req.user;
  try {
    const newContact = await service.createContact({
      name,
      email,
      phone,
      favorite,
      owner: _id,
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
  const { _id: userId } = req.user;
  try {
    const contact = await service.updateContact(
      contactId,
      {
        name,
        email,
        phone,
        favorite,
      },
      userId
    );
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
  const { _id: userId } = req.user;

  try {
    if (req.body) {
      const contact = await service.updateContact(
        contactId,
        { favorite },
        userId
      );
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
  const { _id: userId } = req.user;

  try {
    const removedContact = await service.removeContact(contactId, userId);
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
