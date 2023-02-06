const { Contact } = require("../models/contact");

const getAllContacts = async (userId, skip, limit, favorite) => {
  if (favorite) {
    return Contact.find({ owner: userId, favorite: favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  } else {
    return Contact.find({ owner: userId }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  }
};

const getContactById = (id, userId) => {
  return Contact.findById({ _id: id, owner: userId });
};

const createContact = ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

const updateContact = (id, fields, userId) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, fields, {
    new: true,
  });
};

const removeContact = (id, userId) => {
  return Contact.findOneAndRemove({ _id: id, owner: userId });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
