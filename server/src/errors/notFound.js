module.exports = (req, res, next) =>
  res.status(404).sendFile(__dirname + "/notFoundHtml/error404.html");
