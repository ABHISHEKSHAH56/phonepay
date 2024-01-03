const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const pricingSchema = new mongoose.Schema({
  basePrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  dateAndTime: {
    type: Date,
    required: true,
  },
  numberOfAdults: {
    type: Number,
    required: true,
  },
  numberOfChildren: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    type: String,
    required: true,
  },
  pricing: pricingSchema,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
    default: 'pending',
  },
  cookingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  typeOfEvent: {
    type: String,
    enum: ['marriage', 'anniversary', 'haldi', 'mehendi', 'birthday'],
    required: true,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
