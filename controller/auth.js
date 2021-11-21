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
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    bio: req.body.bio,
    image: req.body.image,
  });

  newUser.setPassword(req.body.password);

  newUser.save();

  res.redirect("/login");
};

module.exports = {
  login,
  logout,
  register,
};
