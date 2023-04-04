const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {

    bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.passoword, salt, function (err, hash) {
            const user = {
                name: req.body.name,
                email: req.body.email,
                passoword: hash,
            }
            models.User.create(user).then(result => {
                res.status(201).json({
                    message: 'User created successfully',
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong"
                });
            });
        });
    });
}

module.exports = {
    signUp: signUp
}