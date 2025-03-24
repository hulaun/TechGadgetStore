const db = require("../models");

const postAddOrder = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  try {
    // Find or create a pending order for the user
    let order = await db.Order.findOne({ _id: userId, status: "pending" });
    if (!order) {
      order = await db.Order.create({ userId });
    }

    // Add or update the order detail
    let orderDetail = await db.OrderDetail.findOne({
      orderId: order.orderId,
      productId,
    });
    if (orderDetail) {
      orderDetail.quantity += Number(quantity);
      await orderDetail.save();
    } else {
      await db.OrderDetail.create({
        orderId: order.orderId,
        productId,
        quantity,
      });
    }

    // Update product quantity
    let product = await db.Product.findOne({ productId });
    if (product) {
      product.quantity -= Number(quantity);
      await product.save();
    }

    res.send({
      errorCode: 0,
      message: "Product added to order successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  let userId = req.userId;

  try {
    let order = await db.Order.findOne({ _id: userId, status: "pending" });
    if (!order) {
      return res.render("Cart", { orderDetails: [], total: 0 });
    }

    let orderDetails = await db.OrderDetail.find({ orderId: order.orderId });

    let productIds = orderDetails.map((d) => d.productId);

    let products = await db.Product.find({ productId: { $in: productIds } });

    let productMap = {};
    products.forEach((product) => {
      productMap[product.productId] = product;
    });

    orderDetails = orderDetails.map((detail) => {
      const product = productMap[detail.productId] || {};
      return {
        ...detail.toObject(),
        productId: product, // replace productId with the full product object
      };
    });

    let total = orderDetails.reduce(
      (sum, detail) => sum + detail.quantity * (detail.productId.price || 0),
      0
    );

    res.send({
      errorCode: 0,
      orderDetails,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postAddOrder,
  getCart,
};
