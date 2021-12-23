const { body, validationResult } = require("express-validator");
const User = require("../models/User");

module.exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("firstname").notEmpty().withMessage("Firstname field required"),

        body("lastname").notEmpty().withMessage("Lastname field required"),

        body("email")
          .notEmpty()
          .withMessage("Email field required")
          .isEmail()
          .withMessage("Valid email required")
          .custom((email) => {
            return User.findOne({ email }).then((user) => {
              if (user) {
                return Promise.reject("Email already exists.");
              }
            });
          })
          .withMessage("Email already exists"),

        body("username")
          .notEmpty()
          .withMessage("Username field required")
          .custom((username) => {
            return User.findOne({ username }).then((user) => {
              if (user) {
                return Promise.reject("Username already exists.");
              }
            });
          })
          .withMessage("Username already exists"),

        body("password").notEmpty().withMessage("Password field required"),

        body("bio").optional(),

        body("image").optional(),
      ];
    }

    case "login": {
      return [
        body("username")
          .notEmpty()
          .withMessage("Username field required")
          .custom((username) => {
            return User.findOne({ username }).then((user) => {
              if (!user) {
                return Promise.reject("No such user exists");
              }
            });
          })
          .withMessage("No such user exists."),

        body("password").notEmpty().withMessage("Password field required"),
      ];
    }
  }
};

module.exports.result = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, msg: "login failure", errors: errors.mapped() });
  }

  next();
};
