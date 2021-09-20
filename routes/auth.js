const router = require('express').Router();
const authMiddlware = require('../middleware/auth')

//Controllers
const auth = require('../controller/auth')

router.route('/login')
.all(authMiddlware.isLoggedin)
.post(auth.login)

router.route('/register')
.all(authMiddlware.isLoggedin)
.post(auth.register)

router.route('/logout')
.get(auth.logout)

module.exports = router;