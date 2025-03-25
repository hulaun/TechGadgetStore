const router = require("express").Router();

router.use("/auth", require("./authRouter"));
router.use("/shop", require("./shopRouter"));
router.use("/product", require("./productRouter"));
router.use("/order", require("./orderRouter"));
router.use("/user", require("./userRouter"));

module.exports = router;
