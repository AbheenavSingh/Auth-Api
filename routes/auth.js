const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign up
router.post('/signup', authController.signup);

// Sign in
router.post('/signin', authController.signin);

// Password reset request
router.post('/reset-password-request', authController.resetPasswordRequest);

// Reset password
router.put('/reset-password', authController.resetPassword);

module.exports = router;
