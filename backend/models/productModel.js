const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
