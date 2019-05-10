const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const ContactsController = require("../controllers/contacts");

router.get("/", ContactsController.contacts_get_all);

router.post("/", checkAuth, ContactsController.contacts_post);

router.get("/:contactId", ContactsController.contacts_get_one);

router.patch("/:contactId", checkAuth, ContactsController.contacts_change);

router.delete("/:contactId", checkAuth, ContactsController.contacts_delete);

module.exports = router;
