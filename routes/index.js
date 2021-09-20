const router = require('express').Router();
const path = require('path');

router.route('/')
.get((req, res) => {
    if (req.isAuthenticated()) {
        return res.sendFile(path.resolve(__dirname, '../view/home.html'));
    } else {
        return res.sendFile(path.resolve(__dirname, '../view/index.html'));
    }
})

router.route('/login')
.get((req, res) => {
    return res.sendFile(path.resolve(__dirname, '../view/login.html'))
})

router.route('/register')
.get((req, res) => {
    return res.sendFile(path.resolve(__dirname, '../view/register.html'));
})

router.route('/writepost')
.get((req, res) => {
    if (req.isAuthenticated()) {
        return res.sendFile(path.resolve(__dirname, '../view/writePost.html'));;
    } else {
        return res.sendFile(path.resolve(__dirname, '../view/index.html'));
    }
})

router.route('/readpost/:id')
.get((req, res) => {
    if (req.isAuthenticated()) {
        return res.sendFile(path.resolve(__dirname, '../view/readPost.html'));;
    } else {
        return res.sendFile(path.resolve(__dirname, '../view/index.html'));
    }
})

module.exports = router;