const routes = require("express").Router();
const usersControllers = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

// Get full info of currently logged user
routes.get("/", isAuthenticated, usersControllers.myAccount);

routes.delete("/", isAuthenticated, usersControllers.deleteAccount);

// Change user name of currently logged user
routes.put("/name", isAuthenticated, usersControllers.changeName);

//This allows to add a game to the logged user games list
routes.post("/games", isAuthenticated, usersControllers.addGame);

//This allows to update a game in the logged user games list
routes.put("/games/:id", isAuthenticated, usersControllers.updateListedGame);

//This allows to delete a game in the logged user games list
routes.delete("/games/:id", isAuthenticated, usersControllers.deleteListedGame);

module.exports = routes;
