const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {

    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(500).json({
                message: 'Email alredy exists!',
            });
        } else {
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
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
        });
    })
}

function login(req, res) {
    models.User.findOne({where:{email: req.body.email}}).then(user => {
        if(user === null) {
            res.status(401).json({
                message: "Inssvalid credetials!"
            });
        } else {
            bcryptjs.compare(req.body.passoword, user.passoword, function(err, result){
                if(result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.userId
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: 'Authentication succcessfull',
                            token: token
                        })
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid creadentialsss',
                    });
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong",
        })
    })
}

module.exports = {
    signUp: signUp,
    login: login 
}