const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { handleMongooseError } = require("../helpers");
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,

    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

// use with password
userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
  await this.save();
};

userSchema.methods.isValidPassword = async function (password) {
  const result = await bCrypt.compare(password, this.password);
  return result;
};

// Use with  tokken
userSchema.methods.generateToken = async function (password) {
  this.token = jwt.sign({ id: this.id }, SECRET_KEY);
  await this.save();
  return this.token;
};

// JOI validation
const schemaRegisterUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const schemaLoginUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const schemaChangeSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const shemas = {
  schemaRegisterUser,
  schemaLoginUser,
  schemaChangeSubscriptionUser,
};

const User = model("user", userSchema);

module.exports = {
  User,
  shemas,
};
