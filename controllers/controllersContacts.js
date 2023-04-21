const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { RequestError, ctrlWrapper } = require("../helpers");

// const getContacts = async (req, res, next) => {
const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

const postContact = async (req, res) => {
  const contacts = await addContact(req.body);
  res.status(201).json(contacts);
};

const putContact = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body);

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await removeContact(req.params.contactId);

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getOneContact: ctrlWrapper(getOneContact),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
  deleteContact: ctrlWrapper(deleteContact),
};
