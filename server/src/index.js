require("dotenv").config();
const express = require("express");
const path = require("path");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const socketio = require("socket.io");
const http = require("http");
//Import database_conection
require("./db_config/db");
app.use(helmet());

//importing routes
const generalServices = require("./routes/general/general");
const doctorServices = require("./routes/doctor/doctor");
const patienteServices = require("./routes/patiente/patiente");
//Settings
app.set("port", process.env.PORT || 5300);

// Build of the frontend
app.use(express.static(path.join(__dirname, "../../client/build")));

// Compresion settings
app.use(compression());

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set the endpoints
app.use(require("./routes/send_mail/send_mail"));
app.use("/", generalServices);
app.use("/", doctorServices);
app.use("/", patienteServices);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(generalServices);



//Socket.io
const server = http.createServer(app);
const io = socketio(server);
//Import connection socket
require("./sockets/sockets")(io);

server.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
