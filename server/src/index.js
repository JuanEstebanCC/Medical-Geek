require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//Settings
app.set('port', process.env.PORT || 5300);

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// 
app.listen(app.get('port'), ()=>{
    console.log(`Server running on port ${app.get('port')}`)
})