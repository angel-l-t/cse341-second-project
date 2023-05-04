const routes = require("express").Router();
const routesControllers = require("../controllers");

//This two are to get all games info
routes.get("/", routesControllers.allGames);

//Create a new game info
routes.post("/", routesControllers.createGame);

module.exports = routes;
