const mongodb = require("../db/connect");

// This function gets all games from games collection
const allGames = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("games").find();

    result.toArray().then((games) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(games); // I want to return every game document
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//This function creates a new game in the games collection
const createGame = async (req, res, next) => {
  try {
    const game = {
      name: req.body.name,
      developer: req.body.developer,
      genres: req.body.genres,
      languages: req.body.languages,
      gameModes: req.body.gameModes,
      platforms: req.body.platforms,
      launchDate: req.body.launchDate,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("games")
      .insertOne(game);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while creating the game info card."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  allGames,
  createGame,
};
