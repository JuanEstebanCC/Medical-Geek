require("dotenv").config;
const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log("Database connected"))
  .catch((err) => console.log(err));

module.exports = db;
