const router = require("express").Router();
const authMiddlware = require("../middleware/auth");
const validateMiddleware = require("../middleware/validate");

//Controllers
const auth = require("../controller/auth");

router
  .route("/login")
  .post(
    authMiddlware.isLoggedin,
    validateMiddleware.validate("login"),
    validateMiddleware.result,
    auth.login
  );

router
  .route("/register")
  .post(
    authMiddlware.isLoggedin,
    validateMiddleware.validate("register"),
    validateMiddleware.result,
    auth.register
  );

router.route("/logout").get(auth.logout);

module.exports = router;
