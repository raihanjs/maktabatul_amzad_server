const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  // JWT_SECRET: process.env.JWT_SECRET,
  // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  // NODE_ENV: process.env.NODE_ENV || 'development',
};