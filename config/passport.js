const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            if (user.validatePassword(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err));
}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
});