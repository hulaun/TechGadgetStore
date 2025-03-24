const db = require("../models");

const getAllProduct = async (req, res) => {
  let result = await db.Product.find().sort({ createdAt: -1 });
  console.log(result);
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await db.Product.findById(id)
    .populate("category")
    .populate("shop");
  const reviews = await db.Rating.find({
    product: id,
  }).populate("user");
  const comments = await db.Comment.find({
    product: id,
  }).populate("user");

  if (!product) {
    return res.status(404).send("Product not found");
  }
  return res.status(200).json({
    errCode: 0,
    data: {
      product,
      reviews,
      comments,
    },
  });
};

const getCategories = async (req, res) => {
  const result = await db.Category.find();
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

const getProductByCategory = async (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);
  const result = await db.Product.find({ category: categoryId });
  console.log(result);
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

module.exports = {
  getAllProduct,
  getProductById,
  getProductByCategory,
  getCategories,
};
