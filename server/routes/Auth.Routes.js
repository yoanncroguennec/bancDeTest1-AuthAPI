const express = require('express')
const router = express.Router();

const {
    register,
} = require('../controllers/AuthCtrl')

router.route('/register').post(register)

module.exports = router;