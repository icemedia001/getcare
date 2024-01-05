const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const questionRoutes = require('./routes/questionRoutes');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3020;

connectDB.once('open', () => {
  console.log('Connected to MongoDB');
});

connectDB.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connectDB.on('close', () => {
  console.log('MongoDB connection closed');
});

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/survey", questionRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on this port number: ${PORT}`);
});