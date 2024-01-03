const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  street: String,
  city: String,
  state: String,
  zipCode: String,
}, {
  timestamps: true,
});

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: String,
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

const User = mongoose.model('User', userSchema);
const Address = mongoose.model('Address', addressSchema);

module.exports = { User, Address };
