require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const socketio = require('socket.io');
const http = require('http');
//Import database_conection
require("./db_config/db");

//importing routes
const generalServices = require("./routes/general/general");
//Settings
app.set("port", process.env.PORT || 5300);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set the endpoints
app.use(require("./routes/send_mail/send_mail"));
app.use("/", generalServices);

app.use(generalServices)

//Socket.io
const server = http.createServer(app);
const io = socketio(server);
//Import connection socket
require('./sockets/sockets')(io);

server.listen(app.get('port'), ()=>{
    console.log(`Server running on port ${app.get('port')}`)
});