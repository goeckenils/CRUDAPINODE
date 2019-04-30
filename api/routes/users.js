const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      console.log(users);
      return res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });
  user
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  res
    .status(200)
    .json({
      message: "Handling POST requests to /users",
      createdUser: user
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .then(user => {
      console.log("From database", user);
      if (user) {
        return res.status(200).json(user);
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

router.patch("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const props = req.body;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: props },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (e) {
    return res.status(404).json({});
  }
});

router.delete("/:userId", (req, res) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
