const { body, validationResult } = require("express-validator");

// Validation Rules for games
const gameValidationRules = () => {
  return [
    // username must be an email
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("platforms").isString().notEmpty().withMessage("Platform is required"),
  ];
};

// Validation Rules for user name change
const userNameValidationRules = () => {
  return [
    // username must be an email
    body("userName").isString().notEmpty().withMessage("Name is required"),
  ];
};

// Validation Rules for games in user's playedGames array
const listedGameValidationRules = () => {
  return [
    // username must be an email
    body("gameId").isString().notEmpty().withMessage("Game ID is required"),
    body("name").isString().notEmpty().withMessage("Name is required"),
  ];
};

// Validation Rules to update "played" field of one game in user's playedGames array
const playedGameValidationRules = () => {
  return [
    // username must be an email
    body("played")
      .isBoolean({ strict: true })
      .withMessage("Boolean value is required"),
  ];
};

// Validator
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  gameValidationRules,
  userNameValidationRules,
  playedGameValidationRules,
  listedGameValidationRules,
  validate,
};
