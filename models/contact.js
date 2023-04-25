const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const phoneRegExp =
  /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// * Scheme add new contact
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegExp,
    },
    phone: {
      type: String,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Set owner contact"],
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

// * Schema Add new contact Joi validation
const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  favorite: Joi.boolean(),
});

// * Schema Add new contact Joi validation
const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemas = {
  schemaAddContact,
  schemaUpdateFavorite,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  shemas,
};
