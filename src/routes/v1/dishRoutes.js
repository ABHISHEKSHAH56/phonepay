const express = require('express');
const router = express.Router();
const {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require('../../controllers/dishController');

// Dish routes
router.post('/', createDish);
router.get('/', getAllDishes);
router.get('/:dishId', getDishById);
router.put('/:dishId', updateDish);
router.delete('/:dishId', deleteDish);

module.exports = router;
