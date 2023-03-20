const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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

router.post("/checkout", auth, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // customer_email: req.body.email,
      submit_type: "pay",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [{ shipping_rate: "shr_1M9N6vSEi48qcQQWQVHnuumn" }],
      line_items: req.body.items.map((item) => {
        const img = item.img;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [img],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 5,
          },
          quantity: item.quantity,
        };
      }),

      success_url: "http://127.0.0.1:5173/home",
      cancel_url: "http://127.0.0.1:5173/cart",
    });

    res.json({ url: session.url });

    // payment_success()
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
