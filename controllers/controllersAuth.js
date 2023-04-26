const gravatar = require("gravatar");
const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");

const { RequestError, ctrlWrapper } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  // Якщо хочемо написати уеікальне повідомлення а не брати стандартне із монгуста, то перевіримо чи існує такий юзер
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already in use");
  }

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, avatarURL });
  await newUser.setPassword(password);
  const token = await newUser.generateToken();
  res.status(201).json({ token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password invalid");
  }
  const passwordIsValid = await user.isValidPassword(password);

  if (!passwordIsValid) {
    throw RequestError(401, "Email or password invalid");
  }

  const token = await user.generateToken();

  res.json({ token, user: { email, subscription: user.subscription } });
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res, next) => {
  req.user.token = "";
  await req.user.save();
  res.status(204).send();
};

const changeSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const user = req.user;
  user.subscription = subscription;
  await user.save();
  res.json({ email: user.email, subscription: user.subscription });
};

const changeAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  changeSubscription: ctrlWrapper(changeSubscription),
  changeAvatar: ctrlWrapper(changeAvatar),
};
