const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Cart = require("../models/Cart");

router.post("/add-to-cart", auth, async (req, res) => {
  const { name, img, price, quantity } = req.body;
  const newItem = new Cart({
    name,
    img,
    price,
    quantity,
    cartOwner: req.user._id,
  });
  try {
    const existedItem = await Cart.findOne({ name });
    if (existedItem) return res.status(200).json("item already added to cart");
    const addedItem = await newItem.save();
    return res.status(200).json(addedItem);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
