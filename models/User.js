const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const crypto = require('crypto');

const uniqueValidator = require('mongoose-unique-validator');

const userRoles = {
    ADMIN: 'ADMIN',
    WRITER: 'WRITER',
    BASIC: 'BASIC'
}

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Ivalid Email'],
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'Invalid Username'],
        unique: true,
        index: true
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
    authorization: {
        type: String,
        default: userRoles.BASIC
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]

}, {timestamps: true});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.plugin(uniqueValidator, {message: ' already taken'});

const User = mongoose.model('User', UserSchema);

module.exports = User;