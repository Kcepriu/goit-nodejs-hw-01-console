const express = require("express");

const ctrl = require("../controllers/controllersContacts");

const { validateBody, isValidId, authenticate } = require("../middlewapres");
const { shemas } = require("../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getOneContact);

router.post(
  "/",
  authenticate,
  validateBody(shemas.schemaAddContact),
  ctrl.postContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(shemas.schemaAddContact),
  ctrl.putContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(shemas.schemaUpdateFavorite),
  ctrl.updateFavorit
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
