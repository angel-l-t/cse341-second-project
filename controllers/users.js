const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

//This function creates a new user in the users collection
const createUser = async (req, res, next) => {
  try {
    const user = {
      userName: req.user.displayName,
      githubId: req.user.id,
      accessLevel: 1,
      playedGames: []
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .updateOne(
        { githubId: user.githubId },
        { $setOnInsert: user},
        { upsert: true }
      );

    if (response.acknowledged) {
      req.session.user = req.user;
      res.status(201).redirect("../");
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while creating the User info card."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message }).redirect("/");
  }
};

const changeName = async (req, res, next) => {
  try {
    
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .updateOne(
        { githubId: req.session.user.id },
        { $set: {userName: req.body.userName} }
      );

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while updating name."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function gets the full info of currently logged user
const myAccount = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({ githubId: req.session.user.id });

    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]); // Returning the logged in user's info.
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function deletes the current logged user account
const deleteAccount = async (req, res, next) => {
  try {   

    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOneAndDelete({ githubId: req.session.user.id });

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

//This function adds a new game in users lists
const addGame = async (req, res, next) => {
  try {
    const game = {
      gameId: req.body.gameId,
      name: req.body.name,
      played: false
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .updateOne(
        { githubId: req.session.user.id },
        { $addToSet: { playedGames: game } }
      );

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while adding game to the list."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function will update games in the playedGames array of a user.
const updateListedGame = async (req, res, next) => {
  try {
    if (req.params.id.length !== 24) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .updateOne(
        {githubId: req.session.user.id, "playedGames.gameId": req.params.id},
        { $set: { "playedGames.$.played": req.body.played } }
      );

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while adding game to the list."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function will delete games in the playedGames array of a user.
const deleteListedGame = async (req, res, next) => {
  try {
    if (req.params.id.length !== 24) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .updateOne(
        {githubId: req.session.user.id},
        { $pull: { playedGames: {gameId: {$in:[req.params.id]}}}}
      );

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while deleting game from the list."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  myAccount,
  deleteAccount,
  changeName,
  addGame,
  updateListedGame,
  deleteListedGame
};
