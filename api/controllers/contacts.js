const mongoose = require("mongoose");
const Contact = require("../models/contact");

exports.contacts_get_all = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    return res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  }
};

exports.contacts_post = async (req, res) => {
  try {
    const contact = await new Contact({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }).save();

    return res.json({
      message: "Handling POST requests to /contacts",
      createdContact: contact
    });
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

exports.contacts_get_one = async (req, res) => {
  try {
    const id = req.params.contactId;

    const contact = await Contact.findById(id);

    return res.status(200).json(contact);
  } catch (err) {
    return err => {
      return res.status(500).json({ error: err });
    };
  }
};

exports.contacts_change = async (req, res) => {
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
};

exports.contacts_delete = async (req, res) => {
  try {
    const id = req.params.contactId;

    const result = await Contact.remove({ _id: id });

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};
