const bookingModel = require('../models/Booking');
const faker = require('faker');
const {    
    v4: uuidv4,
  } = require('uuid');

const list = (req, res, next) => {
    bookingModel.find()
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
    const { firstName, lastName, streetAddress, bookingPrice } = req.body;
    let booking = new bookingModel({
        bookingId: uuidv4(),
        firstName: firstName,
        lastName: lastName,        
        streetAddress: streetAddress,        
        bookingPrice: bookingPrice
    });
    await booking.save()
    .then(response => {
        res.json({         
            message: 'Save Successfully'
        })
    })
}

const generate = async (req, res, next) => {
    for(let i = 1; i < 8; i++){
        let booking = new bookingModel({
            bookingId: uuidv4(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),        
            streetAddress: faker.address.streetAddress(),        
            bookingPrice: Math.floor(Math.random() * 4000)
        });
        await booking.save();
    }
}

const findByName = (req, res, next) => {
    var query = {}
    if(req.body.search) {
        query = {$or:[{firstName:{$regex: req.body.search, $options: 'i'}},{lastName:{$regex: req.body.search, $options: 'i'}}]}
    }

    bookingModel.find(query , function (err, data) {        
        res.json({
            data
        })
     })  
    .catch(error => {
        res.json({
            message: 'Error in find data'
        })
    })
}

module.exports = {
    list, store, generate, findByName
}