module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}

module.exports.isLoggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json({msg: 'You are already logged in.'})
    } else {
        next();
    }
}