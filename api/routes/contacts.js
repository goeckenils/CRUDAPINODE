const express = require("express");
const mongoose = require("mongoose");
const contact = require("../models/contact");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", (req, res, next) => {
  contact
    .find()
    .exec()
    .then(contacts => {
      console.log(contacts);
      return res.status(200).json(contacts);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

router.post("/", checkAuth, (req, res) => {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });
  contact
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  res
    .status(200)
    .json({
      message: "Handling POST requests to /contacts",
      createdContact: contact
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/:contactId", (req, res) => {
  const id = req.params.contactId;
  Contact.findById(id)
    .then(contact => {
      console.log("From database", contact);
      if (contact) {
        return res.status(200).json(contact);
      } else {
        res.status(404).json({
          message: "No Valid entry found for provided ID"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.patch("/:contactId", async (req, res) => {
  try {
    const id = req.params.contactId;
    const props = req.body;

    const contact = await contact.findOneAndUpdate(
      { _id: id },
      { $set: props },
      { new: true }
    );

    return res.status(200).json(contact);
  } catch (e) {
    return res.status(404).json({});
  }
});

router.delete("/:contactId", (req, res) => {
  const id = req.params.contactId;
  contact
    .remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
