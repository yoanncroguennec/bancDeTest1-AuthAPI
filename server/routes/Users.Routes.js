const express = require('express')
const router = express.Router();

const {
    getAllUsers
} = require('../controllers/UserCtrl')
// MIDDLEWARES
const { isAuthenticatedUser } = require('../middlewares/auth/auth');

router.route('/')
    .get(getAllUsers);


module.exports = router;