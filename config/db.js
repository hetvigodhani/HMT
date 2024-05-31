const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB...');
  } catch (error) {
    logger.error('Could not connect to MongoDB...', error);
    process.exit(1);
  }
};

module.exports = connectDB;
