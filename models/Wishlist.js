const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const WishList = mongoose.model("WishList", wishlistSchema);

module.exports = WishList;
