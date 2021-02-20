require('dotenv').config;
const mongoose = require('mongoose');

const db = mongoose.connection(`${process.env.DB_URL}`, {
    usedNewUrlParser:true
}).then(db => console.log('Database connected')

).catch(err => console.log(err))

module.exports=db_connection;