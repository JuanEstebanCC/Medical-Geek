require('dotenv').config;
const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB_CONNECTION, {
  usedNewUrlParser:true
}).then(db => console.log('Database connected')

).catch(err => console.log(err))

module.exports=db;
