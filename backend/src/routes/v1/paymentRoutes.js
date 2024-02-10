const express = require("express");
const {
  newPayment,
  checkStatus,
} = require("../../controllers/paymentController");
const router = express.Router();

router.post("/initiate", newPayment);
router.get("/status/:txnId", checkStatus);

module.exports = router;
