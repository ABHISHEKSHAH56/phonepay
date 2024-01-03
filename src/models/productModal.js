const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['veggies', 'fruits', 'spices'],
    required: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
