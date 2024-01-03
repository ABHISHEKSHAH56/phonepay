const { Dish } = require('../models/dishModal');

const createDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateDish = async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.dishId, req.body, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDish = async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.dishId);
    if (!deletedDish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.json(deletedDish);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
};
