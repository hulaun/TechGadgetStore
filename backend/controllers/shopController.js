const db = require("../models");

const getAllShop = async (req, res) => {
  let result = await db.Shop.find().sort({ createdAt: -1 });
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

const getShopById = async (req, res) => {
  const id = req.params.id;
  const result = await db.Shop.findById(id);
  if (!result) {
    return res.status(404).send("Shop not found");
  }
  return res.status(200).json({
    errCode: 0,
    data: result,
  });
};

module.exports = {
  getAllShop,
  getShopById,
};
