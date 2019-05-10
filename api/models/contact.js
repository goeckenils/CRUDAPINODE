const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: Number
});

contactSchema.virtual("id").get(function() {
  return this._id;
});

contactSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Contact", contactSchema);
