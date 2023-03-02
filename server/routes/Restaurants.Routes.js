const express = require('express')
const router = express.Router();

/* ****************************************************************
******************************* USER ******************************
**************************************************************** */
const {
    getRestaurant,
    getAllRestaurants,
} = require('../controllers/RestaurantCtrl')
/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const {
    newRestaurant
} = require('../controllers/admin/RestaurantCtrl_Admin')



router.route('/')
    .post(newRestaurant)
    .get(getAllRestaurants);

router.route('/:id')
    .get(getRestaurant);

module.exports = router;