const routes = require("express").Router();
const routesControllers = require("../controllers/games");
const { gameValidationRules, validate } = require('../validation/games-validator')

//This two are to get all games info or one game's info using id
routes.get("/", routesControllers.allGames);
routes.get("/:id", routesControllers.oneGame);

//Create a new game info
routes.post("/", gameValidationRules(), validate, routesControllers.createGame);

// Update one game info
routes.put("/:id", gameValidationRules(), validate, routesControllers.updateGame);

// Delete one game by id
routes.delete("/:id", routesControllers.deleteGame);

module.exports = routes;
