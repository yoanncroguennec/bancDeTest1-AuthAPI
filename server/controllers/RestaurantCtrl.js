/* ***************************************************************************
******************************* USER RESTAURANT ******************************
*************************************************************************** */
const Restaurant = require('../models/Restaurant')

exports.getRestaurant = async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) return res.status(201).json({
        success: false,
        message: "Restaurant non trouvé."
    })

    res.status(201).json({
        success: true,
        restaurant
    })
}

exports.getAllRestaurants = async (req, res, next) => {
    const restaurantsCount = await Restaurant.countDocuments();
    const restaurants = await Restaurant.find();

    res.status(201).json({
        success: true,
        restaurantsCount,
        restaurants
    })
}
