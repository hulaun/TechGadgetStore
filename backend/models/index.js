const User = require("./userModel");
const Category = require("./categoryModel");
const Shop = require("./shopModel");
const Product = require("./productModel");
const Rating = require("./ratingModel");
const Comment = require("./commentModel");
const OrderDetail = require("./orderDetailModel");
const Order = require("./orderModel");

const db = {};

// Define schema
db.User = User;
db.Category = Category;
db.Shop = Shop;
db.Product = Product;
db.Rating = Rating;
db.Comment = Comment;
db.OrderDetail = OrderDetail;
db.Order = Order;

module.exports = db;
