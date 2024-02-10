const express = require("express");
const router = express.Router();
const PaymentRoutes = require("./paymentRoutes");

router.use("/payment", PaymentRoutes);

module.exports = router;
