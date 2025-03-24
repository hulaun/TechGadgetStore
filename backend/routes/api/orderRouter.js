const express = require("express");
const OrderController = require("../../controllers/orderController");

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(OrderController.getCart)
  .post(OrderController.postAddOrder);

module.exports = orderRouter;
