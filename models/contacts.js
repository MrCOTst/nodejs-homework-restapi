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
  const contacts = await listContacts();
  let removedContact;
  const updatedContacts = contacts.filter((item) => {
    if(item.id === String(contactId)) {
      removedContact = item};
      return item.id !== String(contactId)
    });
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return removedContact;  
  };

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, contact) => {
  let contacts = await listContacts();
  contacts = contacts.map((item) => {
    if (item.id === String(contactId)) {
      return { ...item, ...contact };
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
