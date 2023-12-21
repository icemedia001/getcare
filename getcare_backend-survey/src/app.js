const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser")
const surveyRoutes = require("./routes/surveyRoutes");
const app = express();

//ENV CONNECT
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3020;
connectDB();

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/survey", surveyRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on this port number: ${PORT}`);
});