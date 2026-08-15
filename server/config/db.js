const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Disable buffering so queries fail/resolve instantly instead of timing out after 10s
    mongoose.set('bufferCommands', false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database Status: Running in standalone mock mode (${error.message})`);
  }
};

module.exports = connectDB;