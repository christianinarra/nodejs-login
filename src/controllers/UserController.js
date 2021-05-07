const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const list = (req, res, next) => {
    userModel.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error in find data'
        })
    })
}

const show = (req, res, next) => {
    let userId = req.body.userId;
    userModel.findById(userId)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error in find data'
        })
    })
}

const store = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const { name, email } = req.body;
    let userData = new userModel({
        name: name,
        email: email,
        password: hashedPass
    });
    await userData.save()
    .then(response => {
        res.json({         
            message: 'Save Successfully'
        })
    })
}

module.exports = {
    list, show, store
}