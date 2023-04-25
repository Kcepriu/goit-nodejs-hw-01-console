const express = require("express");
const ctrl = require("../controllers/controllersAuth");

const { validateBody, authenticate } = require("../middlewapres");
const { shemas } = require("../models/user");

const router = express.Router();

// signUp
router.post(
  "/register",
  validateBody(shemas.schemaRegisterUser),
  ctrl.register
);

// signIn
router.post("/login", validateBody(shemas.schemaLoginUser), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);

router.patch(
  "/subscription",
  authenticate,
  validateBody(shemas.schemaChangeSubscriptionUser),
  ctrl.changeSubscription
);

module.exports = router;
