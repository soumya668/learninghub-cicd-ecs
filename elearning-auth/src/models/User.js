// User.js - User model with Mongoose schema
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String
    }
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to create User instances from API response
userSchema.statics.fromApiResponse = function(apiUsers) {
  if (Array.isArray(apiUsers)) {
    return apiUsers.map(userData => ({
      userId: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
      website: userData.website,
      company: userData.company
    }));
  }
  return {
    userId: apiUsers.id,
    name: apiUsers.name,
    username: apiUsers.username,
    email: apiUsers.email,
    address: apiUsers.address,
    phone: apiUsers.phone,
    website: apiUsers.website,
    company: apiUsers.company
  };
};

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
