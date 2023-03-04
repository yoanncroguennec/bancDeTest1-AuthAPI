const express = require('express')
const router = express.Router();

/* ****************************************************************
******************************* USER ******************************
**************************************************************** */
const {
    getUserProfile
} = require('../controllers/UserCtrl')

/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const {
    getAllUsers
} = require('../controllers/admin/UserCtrl_Admin')
// MIDDLEWARES
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth/auth');



router.route('/me')
    .get(isAuthenticatedUser, getUserProfile);

router.route('/')
    .get(getAllUsers);


module.exports = router;