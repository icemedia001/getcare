const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/getCareDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

dbConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

dbConnection.on('close', () => {
  console.log('MongoDB connection closed');
});

module.exports = dbConnection;
