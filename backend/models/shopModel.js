const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isOfficial: { type: Boolean, default: false },
  profileImage: { type: String },
  descrition: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
