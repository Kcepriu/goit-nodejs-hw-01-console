const express = require("express");

const ctrl = require("../../controllers/controllersContacts");

const { validateBody } = require("../../middlewapres");
const { schemaValidationContact } = require("../../schemes");

const router = express.Router();

router.get("/", ctrl.getContacts);
router.get("/:contactId", ctrl.getOneContact);
router.post("/", validateBody(schemaValidationContact), ctrl.postContact);
router.delete("/:contactId", ctrl.deleteContact);
router.put(
  "/:contactId",
  validateBody(schemaValidationContact),
  ctrl.putContact
);

module.exports = router;
