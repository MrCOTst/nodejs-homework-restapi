const { v4 } = require("uuid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === String(contactId));
  if (!contact) {
    return;
  }
  return contact;
};

const removeContact = async (contactId) => {
  let contacts = await listContacts();
  contacts = contacts.filter((item) => item.id !== String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  let contacts = await listContacts();
  contacts = contacts.map((item) => {
    if (item.id === String(contactId)) {
      item = { ...item, ...{ name, email, phone } };
    }
    return item;
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
