const { ObjectId } = require("mongodb");
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

// This function gets one game's info using id
const oneGame = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }

    const gameId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection("games")
      .find({ _id: gameId });

    result.toArray().then((games) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(games[0]); // Returning a sigle game.
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

    // Lines 56-62, It is to fill not required fields with "N/A" if they are empty or null.
    const gameFields = Object.keys(game);

    gameFields.forEach((gameField) => {
      if (game[gameField] == null || game[gameField] == "") {
        game[gameField] = "N/A";
      }
    });

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

// This function is for update of an existing game entry
const updateGame = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }

    const gameId = new ObjectId(req.params.id);

    const game = {
      name: req.body.name,
      developer: req.body.developer,
      genres: req.body.genres,
      languages: req.body.languages,
      gameModes: req.body.gameModes,
      platforms: req.body.platforms,
      launchDate: req.body.launchDate,
    };

    // Lines 96-102, It is to fill not required fields with "N/A" if they are empty or null.
    const gameFields = Object.keys(game);

    gameFields.forEach((gameField) => {
      if (game[gameField] == null || game[gameField] == "") {
        game[gameField] = "N/A";
      }
    });

    const response = await mongodb
      .getDb()
      .db()
      .collection("games")
      .replaceOne({ _id: gameId }, game);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the game.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function deletes a game
const deleteGame = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }

    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("games")
      .findOneAndDelete({ _id: userId });

    if (response) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the game.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  allGames,
  oneGame,
  createGame,
  updateGame,
  deleteGame,
};
