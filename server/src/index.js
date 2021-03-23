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
const cron = require("node-cron");
const moment = require("moment");
//Import database_conection
require("./db_config/db");
// Use Helmet for security issues
app.use(helmet());

// Import errors middlewares
const notFound = require("./errors/notFound");
const handleErrors = require("./errors/handleErrors");

//importing routes
const generalServices = require("./routes/general/general");
const doctorServices = require("./routes/doctor/doctor");
const patienteServices = require("./routes/patiente/patiente");
//Settings
app.set("port", process.env.PORT || 5300);

// Build of the frontend
// TODO Discomment this line when build the frontend
// app.use(express.static(path.join(__dirname, "../../client/build")));

// Compresion settings
app.use(compression());

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set the endpoints
// TODO Discomment this line when build the frontend
/* app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
}); */

app.use("/", generalServices);
app.use("/", doctorServices);
app.use("/", patienteServices);

app.use(require("./routes/send_mail/send_mail"));

// Error Middlewares
app.use(notFound);
app.use(handleErrors);

//Socket.io
const server = http.createServer(app);
const io = socketio(server);
//Import connection socket
require("./sockets/sockets")(io);

// send message
cron.schedule("* * * * *", () => {
  require("./send_message/send_message")(moment);
});

server.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});

// TODO Hacer el middware para el control de errores y el middleware 404  en archivos separados,
// TODO Hacer errores personalizados en el backend y mostrarlos en el frontend
// TODO ver si se puede cambiar el / por /api/
// TODO ver si se puede usar Sentry
// TODO crear un 404 page para el frontend
// TODO verificar si se importa react en todas los componentes (pages)
// TODO cerrar la conexión de moongose en caso de error
