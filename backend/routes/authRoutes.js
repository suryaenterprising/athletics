const express = require('express');
const router = express.Router();
const { authUser, registerAdmin, getUserProfile } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/register', registerAdmin); // In production, might want to protect this route: router.post('/register', protect, admin, registerAdmin);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
