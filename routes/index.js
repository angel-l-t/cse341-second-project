const routes = require("express").Router();

// Using routes in contacts.js
routes.use("/games", require("./games"));
routes.use("/", require("./swagger"));

module.exports = routes;
