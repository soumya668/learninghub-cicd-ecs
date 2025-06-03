// MongoDB connection configuration
const mongoose = require('mongoose');

// MongoDB connection string
// In a production environment, this should be stored in environment variables
const MONGO_URI = process.env.MONGO_URI;
//'mongodb://localhost:27017/elearning';
//'mongodb://host.docker.internal:6000/elearning';
//'mongodb://mongodb-net:27017/elearning;
// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      // These options are no longer needed in Mongoose 6+, but kept for backward compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;