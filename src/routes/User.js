const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/list', userController.list);
router.post('/store', userController.store);

module.exports = router;