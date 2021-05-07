const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    console.log(req.body);

    userModel.findOne({$or: [{email: email}, {name: email}]})
    .then(user => {
        if (user){
            bcrypt.compare(password, user.password, function(err, result){
                if (err){
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'});
                    res.json({
                        status: "successful",
                        message: 'Login Successful!',
                        token
                    })
                }else {
                    res.json({
                        status: "error",
                        message: 'Password does not matched!',
                    })
                }
            });
        }else{
            res.json({
                status: "error",
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    login
}