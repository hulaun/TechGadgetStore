const express = require("express");
const ProductController = require("../../controllers/productController");

const productController = express.Router();

productController.route("/").get(ProductController.getAllProduct);
productController.route("/category").get(ProductController.getCategories);

productController.route("/:id").get(ProductController.getProductById);
productController
  .route("/category/:id")
  .get(ProductController.getProductByCategory);

module.exports = productController;
