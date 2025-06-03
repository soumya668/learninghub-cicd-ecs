// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route   POST /api/users/sync
 * @desc    Sync users from external API to MongoDB
 * @access  Public
 */
router.post('/sync', userController.syncUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get single user by ID
 * @access  Public
 */
router.get('/:id', userController.getUserById);

module.exports = router;
