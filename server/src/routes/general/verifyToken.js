// Import jwt and the secret 
const jwt = require("jsonwebtoken");
const config = require("../../config/config");


function verifyToken(req, res, next) {
  // 
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  const decodec = jwt.verify(token, config.secret);
  req.userId = decodec.indexOf;
  next();
}

module.exports = verifyToken;
