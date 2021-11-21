const mongoose = require("mongoose");
const Blog = require("../models/Blog");

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

module.exports.isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ msg: "You are already logged in." });
  } else {
    next();
  }
};

module.exports.isOwner = (req, res, next) => {
  Blog.find({ author: req.user })
    .then((result) => {
      if (
        result.find((a) => a._id.equals(mongoose.Types.ObjectId(req.params.id)))
      ) {
        next();
      } else {
        return res
          .status(200)
          .json({ msg: "You are not the author of this post, begone!" });
      }
    })
    .catch((err) => res.send(err));
};
