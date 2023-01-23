// const fs = require('fs/promises')
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
  const searchContact = contacts.find((obj) => obj.id === String(contactId));
  if (!searchContact) {
    return console.log(`No contact with id ${contactId}`);
  }
  return searchContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((obj) => obj.id === String(contactId));
  if (index < 0) {
    return `No contact with id ${contactId}`;
  }
  const [newList] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newList;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const searchContact = contacts.find((obj) => obj.id === String(contactId));
  if (!searchContact) {
    return console.log(`No contact with id ${contactId}`);
  }
  const index = contacts.findIndex((obj) => obj.id === String(contactId));
  if (index < 0) {
    return `No contact with id ${contactId}`;
  }
  name && (searchContact.name = name);
  email && (searchContact.email = email);
  phone && (searchContact.phone = phone);
  contacts.splice(index, 1);
  contacts.push(searchContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log("searchContact:", searchContact);
  return searchContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
