const mongoose = require("mongoose");

module.exports = function ConnectToDB() {
  mongoose
    .connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongoDB"))
    .catch((error) => console.log(error));
};
