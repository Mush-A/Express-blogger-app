const passport = require("passport");
const User = require("../models/User");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      //   req.session.user = req.user;
      return res.redirect("/");
    });
  })(req, res, next);
};

// Clearns user session in the database and also remove the user from req.user
const logout = (req, res, next) => {
  // req.logout();
  req.session.destroy((err) => {
    if (err) {
      res.send(err);
      return next(err);
    }
    return res.redirect("/login");
  });
};

const register = (req, res, next) => {
  const { firstname, lastname, email, username, bio, image } = req.body;

  let newUser = new User({ firstname, lastname, email, username, bio, image })
    .setPassword(req.body.password)
    .save()
    .then(() => res.redirect("/login"))
    .catch((err) => res.status(500).json({ msg: err }));
};

module.exports = {
  login,
  logout,
  register,
};
