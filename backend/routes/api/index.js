const router = require("express").Router();

router.use("/auth", require("./authRouter"));
router.use("/shop", require("./shopRouter"));
router.use("/product", require("./productRouter"));
router.use("/order", require("./orderRouter"));

module.exports = router;
