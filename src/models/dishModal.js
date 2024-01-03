const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['indian', 'chinese', 'dessert'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, {
  timestamps: true,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
