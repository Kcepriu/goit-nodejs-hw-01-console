const express = require("express");

const ctrl = require("../controllers/controllersContacts");

const { validateBody, isValidId } = require("../middlewapres");
const { shemas } = require("../models/contact");

const router = express.Router();

router.get("/", ctrl.getContacts);
router.get("/:contactId", isValidId, ctrl.getOneContact);
router.post("/", validateBody(shemas.schemaAddContact), ctrl.postContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(shemas.schemaAddContact),
  ctrl.putContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(shemas.schemaUpdateFavorite),
  ctrl.updateFavorit
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
