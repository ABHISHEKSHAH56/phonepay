const jwt = require('jsonwebtoken');
const { User, Address } = require('../models/userModel');
const generateToken = require('../config/generateToken');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id,user.role);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const address = new Address(req.body);
    await address.save();
    user.addresses.push(address._id);
    await user.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('addresses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add more controller methods as needed

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  updateUserDetails,
  createAddress,
  getAllAddresses,
  // Add more controller methods as needed
};
