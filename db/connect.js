const mongoose = require("mongoose");

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.sm4dg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
};

module.exports = { MONGO_URI, connectDB };
