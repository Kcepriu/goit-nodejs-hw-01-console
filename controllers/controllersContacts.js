const { Contact } = require("../models/contact");

const { RequestError, ctrlWrapper } = require("../helpers");

// const getContacts = async (req, res, next) => {
const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  // const contact = await Contact.findOne({ _id: req.params.contactId });
  const contact = await Contact.findById(req.params.contactId);

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

const postContact = async (req, res) => {
  const contacts = await Contact.create(req.body);
  res.status(201).json(contacts);
};

const putContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

const updateFavorit = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.contactId);

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
  updateFavorit: ctrlWrapper(updateFavorit),
  deleteContact: ctrlWrapper(deleteContact),
};
