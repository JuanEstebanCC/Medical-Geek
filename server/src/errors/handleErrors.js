module.exports = (err, req, res, next) => {
  console.error(err.name, err.code);
  err.name === "MongoError" && err.code === 11000
    ? res.status(500).send({ error: "The email is alredy used" })
    : err.name === "CastError"
    ? res.status(400).send({ error: "Something" })
    : res.status(500).end();
};
