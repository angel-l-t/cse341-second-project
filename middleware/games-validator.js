const { body, validationResult } = require("express-validator");

// Validation Rules for games
const gameValidationRules = () => {
  return [
    // username must be an email
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("platforms").isString().notEmpty().withMessage("Platform is required"),
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
  validate,
};
