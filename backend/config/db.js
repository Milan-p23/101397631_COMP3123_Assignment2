// Import mongoose
const mongoose = require('mongoose');

// MongoDB connection 
const connectDB = async () => {
  try {
    // Define the MongoDB URI
    const mongoURI = 'mongodb+srv://milanpatel:Milan5@cluster0.pxwf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); 
  }
};


module.exports = connectDB;