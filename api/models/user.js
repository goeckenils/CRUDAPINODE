const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: { type: String, required: true }
});

userSchema.virtual("id").get(function() {
  return this._id;
});

userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
