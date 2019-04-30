const mongoose = require("mongoose");

module.exports.connect = () => {
  console.log("connect to mongo");
  return mongoose
    .connect(
      "mongodb+srv://Nils_1:nils@nilscluster-javye.mongodb.net/test?retryWrites=true",
      {
        useNewUrlParser: true
      }
    )
    .then(() => {
      console.log("now connected");
    });
};
