const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../../controllers/orderController');

// Order routes
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;