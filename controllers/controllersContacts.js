const { Contact } = require("../models/contact");

const { RequestError, ctrlWrapper } = require("../helpers");

// const getContacts = async (req, res, next) => {
const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  const skip = (page - 1) * limit;

  // TODO Оце костиль, спитати як робиться правильно!!!
  // Якщо буде декілька параметрві, то як робити?
  const addFilter = favorite ? { favorite } : {};

  const contacts = await Contact.find({ owner, ...addFilter }, null, {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  // const contact = await Contact.findOne({ _id: req.params.contactId });
  const contact = await Contact.findById(req.params.contactId).populate(
    "owner",
    "email subscription"
  );

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await Contact.create({ ...req.body, owner });
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
