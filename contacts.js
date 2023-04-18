const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function readFile() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function writeFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// TODO: задокументувати кожну функцію

async function listContacts() {
  const contacts = await readFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact || null;
}

async function removeContact(contactId) {
  //Отут повертати масив видалених елементів
  //через splice
  const contacts = await listContacts();
  const newContact = contacts.filter((contact) => contact.id !== contactId);
  await writeFile(newContact);
  return contactId;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);

  await writeFile(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
