const validateBody = require("./validateBody");
const isValidId = require("./isValidIs");
const authenticate = require("./authenticate");
const upload = require("./upload");
const resizeAvatar = require("./resizeAvatar");
const validateFile = require("./validateFile");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  resizeAvatar,
  validateFile,
};
