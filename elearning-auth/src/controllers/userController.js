// User controller for handling user-related operations
const apiClient = require('../utils/apiClient');
const User = require('../models/User');
const API_CONFIG = require('../config/api');

/**
 * Get all users from MongoDB or fetch from external API if not available
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function getAllUsers(req, res, next) {
  try {
    // Try to get users from MongoDB first
    let users = await User.find();

    // If no users in MongoDB, fetch from external API and save to MongoDB
    if (users.length === 0) {
      console.log('No users found in database, fetching from external API...');
      const usersData = await apiClient.get(API_CONFIG.ENDPOINTS.USERS);
      const formattedUsers = User.fromApiResponse(usersData);

      // Save users to MongoDB
      users = await User.insertMany(formattedUsers);
      console.log(`${users.length} users saved to database`);
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
      source: users.length > 0 ? 'database' : 'api'
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to fetch users'
    });
  }
}

/**
 * Get a single user by ID from MongoDB or fetch from external API if not available
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function getUserById(req, res, next) {
  try {
    const userId = parseInt(req.params.id);

    // Try to find user in MongoDB first
    let user = await User.findOne({ userId });
    let source = 'database';

    // If user not found in MongoDB, fetch from external API and save to MongoDB
    if (!user) {
      console.log(`User with id ${userId} not found in database, fetching from external API...`);
      try {
        const userData = await apiClient.get(`${API_CONFIG.ENDPOINTS.USERS}/${userId}`);
        if (!userData) {
          return res.status(404).json({
            success: false,
            error: 'Not Found',
            message: `No user found with id ${userId}`
          });
        }

        // Format and save user to MongoDB
        const formattedUser = User.fromApiResponse(userData);
        user = await User.create(formattedUser);
        console.log(`User with id ${userId} saved to database`);
        source = 'api';
      } catch (apiError) {
        // Handle 404 errors from the external API
        if (apiError.response && apiError.response.status === 404) {
          return res.status(404).json({
            success: false,
            error: 'Not Found',
            message: `No user found with id ${userId}`
          });
        }
        throw apiError; // Re-throw for the outer catch block
      }
    }

    res.status(200).json({
      success: true,
      data: user,
      source
    });
  } catch (error) {
    console.error(`Error fetching user with id ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to fetch user'
    });
  }
}

/**
 * Sync all users from external API to MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function syncUsers(req, res, next) {
  try {
    // Fetch all users from external API
    const usersData = await apiClient.get(API_CONFIG.ENDPOINTS.USERS);
    const formattedUsers = User.fromApiResponse(usersData);

    // Clear existing users (optional, based on requirements)
    await User.deleteMany({});

    // Save users to MongoDB
    const savedUsers = await User.insertMany(formattedUsers);

    res.status(200).json({
      success: true,
      message: 'Users synced successfully',
      count: savedUsers.length,
      data: savedUsers
    });
  } catch (error) {
    console.error('Error syncing users:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to sync users from external API'
    });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  syncUsers
};
