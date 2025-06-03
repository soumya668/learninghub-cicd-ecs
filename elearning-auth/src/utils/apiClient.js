// API client utility for making HTTP requests
const axios = require('axios');
const API_CONFIG = require('../config/api');

/**
 * Makes a GET request to the specified endpoint
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} params - Query parameters to include in the request
 * @returns {Promise<Object>} - The response data
 */
async function get(endpoint, params = {}) {
  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Makes a POST request to the specified endpoint
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send in the request body
 * @returns {Promise<Object>} - The response data
 */
async function post(endpoint, data = {}) {
  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error.message);
    throw error;
  }
}

module.exports = {
  get,
  post
};