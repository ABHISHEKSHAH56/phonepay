const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../../controllers/productController');

// Product routes
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
