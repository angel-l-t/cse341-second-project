const routes = require("express").Router();
const routesControllers = require("../controllers/games");
const {
  gameValidationRules,
  validate,
} = require("../middleware/games-validator");
const { isAuthenticated } = require("../middleware/authenticate");

//This two are to get all games info or one game's info using id
routes.get("/", routesControllers.allGames);
routes.get("/:id", routesControllers.oneGame);

//Create a new game info
routes.post(
  "/",
  isAuthenticated,
  gameValidationRules(),
  validate,
  routesControllers.createGame
);

// Update one game info
routes.put(
  "/:id",
  isAuthenticated,
  gameValidationRules(),
  validate,
  routesControllers.updateGame
);

// Delete one game by id
routes.delete("/:id", isAuthenticated, routesControllers.deleteGame);

module.exports = routes;
