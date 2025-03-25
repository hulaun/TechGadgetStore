const db = require("../models");
const mongoose = require("mongoose");
const getAllProduct = async (req, res) => {
  const result = await db.Product.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "product",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: "$ratings" }, 0] },
            { $avg: "$ratings.rating" },
            0,
          ],
        },
      },
    },
    {
      $project: {
        ratings: 0, // optional: remove raw ratings array from the result
      },
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

const getTopProduct = async (req, res) => {
  const result = await db.Product.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "product",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: "$ratings" }, 0] },
            { $avg: "$ratings.rating" },
            0,
          ],
        },
      },
    },
    {
      $project: {
        ratings: 0, // optional: remove raw ratings array from the result
      },
    },
    {
      $limit: 3,
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await db.Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $lookup: {
        from: "shops",
        localField: "shop",
        foreignField: "_id",
        as: "shop",
      },
    },
    { $unwind: "$shop" },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "product",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: "$ratings" }, 0] },
            { $avg: "$ratings.rating" },
            0,
          ],
        },
      },
    },
    {
      $project: {
        ratings: 0, // optional: hide raw ratings array
      },
    },
  ]);
  const comments = await db.Comment.find({
    product: id,
  }).populate("user");

  if (!product) {
    return res.status(404).send("Product not found");
  }
  return res.status(200).json({
    errCode: 0,
    data: {
      product: product[0],
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
  getTopProduct,
  getProductById,
  getProductByCategory,
  getCategories,
};
