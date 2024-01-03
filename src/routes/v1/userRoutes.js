const express = require('express');
const {
    createUser,
    loginUser,
    getAllUsers,
    updateUserDetails,
    createAddress,
    getAllAddresses,
    // Add more controller methods as needed
  } = require('../../controllers/userController');
const router = express.Router();


// User routes
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:userId', updateUserDetails);
router.post('/:userId/addresses', createAddress);
router.get('/:userId/addresses', getAllAddresses);
// Add more routes as needed

module.exports = router;
