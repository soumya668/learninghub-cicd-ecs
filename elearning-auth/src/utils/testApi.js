// Test script for API endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Function to test the API
async function testApi() {
  try {
    console.log('Testing API endpoints...');

    // Test root endpoint
    console.log('\n1. Testing root endpoint:');
    const rootResponse = await axios.get(`${BASE_URL}/`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Status:', rootResponse.status);
    console.log('Data:', rootResponse.data);

    // Test get all users endpoint
    console.log('\n2. Testing get all users endpoint:');
    const usersResponse = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Status:', usersResponse.status);
    console.log('Count:', usersResponse.data.count);
    console.log('First user:', usersResponse.data.data[0]);

    // Test get user by ID endpoint
    console.log('\n3. Testing get user by ID endpoint:');
    const userId = 1;
    const userResponse = await axios.get(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Referer': 'http://localhost:3000',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Status:', userResponse.status);
    console.log('User data:', userResponse.data.data);

    // Test invalid endpoint (404)
    console.log('\n4. Testing invalid endpoint (should return 404):');
    try {
      await axios.get(`${BASE_URL}/api/invalid`, {
        headers: {
          'Origin': 'http://localhost:3000',
          'Referer': 'http://localhost:3000',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
    } catch (error) {
      console.log('Status:', error.response.status);
      console.log('Error data:', error.response.data);
    }

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Instructions for running the test
console.log(`
=================================================
API TEST SCRIPT
=================================================
To use this test script:
1. Start the server with 'npm run dev' or 'npm run server'
2. In a separate terminal, run 'node src/utils/testApi.js'
=================================================
`);

// Only run the test if this file is executed directly
if (require.main === module) {
  testApi();
}

module.exports = { testApi };
