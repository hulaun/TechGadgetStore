const express = require("express");
const ShopController = require("../../controllers/shopController");

const shopRouter = express.Router();

shopRouter.route("/").get(ShopController.getAllShop);

shopRouter.route("/:id").get(ShopController.getShopById);

module.exports = shopRouter;
