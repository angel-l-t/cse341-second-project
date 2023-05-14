const routes = require("express").Router();
const usersControllers = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");
const {
  userNameValidationRules,
  listedGameValidationRules,
  playedGameValidationRules,
  validate,
} = require("../middleware/validation-rules");

// Get full info of currently logged user
routes.get("/", isAuthenticated, usersControllers.myAccount);

routes.delete("/", isAuthenticated, usersControllers.deleteAccount);

// Change user name of currently logged user
routes.put(
  "/name",
  isAuthenticated,
  userNameValidationRules(),
  validate,
  usersControllers.changeName
);

//This allows to add a game to the logged user games list
routes.post(
  "/games",
  isAuthenticated,
  listedGameValidationRules(),
  validate,
  usersControllers.addGame
);

//This allows to update a game in the logged user games list
routes.put(
  "/games/:id",
  isAuthenticated,
  playedGameValidationRules(),
  validate,
  usersControllers.updateListedGame
);

//This allows to delete a game in the logged user games list
routes.delete("/games/:id", isAuthenticated, usersControllers.deleteListedGame);

module.exports = routes;
