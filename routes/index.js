const routes = require("express").Router();
const passport = require("passport");

// Using routes in contacts.js
routes.use("/games", require("./games"));
routes.use("/my-account", require("./user"));
routes.use("/", require("./swagger"));

// Login using github
routes.get("/login", passport.authenticate("github"), (req, res) => {});

// Clearing session / Logging out
routes.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = routes;
