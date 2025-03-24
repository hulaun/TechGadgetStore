const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.Number, ref: "User" }, // Tham chiếu userId
  status: {
    type: String,
    enum: ["pending", "success", "cancel"],
    default: "pending",
  },
  total: Number,
  orderDate: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
