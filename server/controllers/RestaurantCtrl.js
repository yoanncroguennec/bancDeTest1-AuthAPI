/* ***************************************************************************
******************************* USER RESTAURANT ******************************
*************************************************************************** */
// MODEL
const Restaurant = require('../models/Restaurant')
// MIDDLEWARES ERRORS
const ErrorHandler = require('../utils/errors/errorHandler');
// UTILS ERRORS
const catchAsyncErrors = require('../middlewares/errors/catchAsyncErrors');


exports.getRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) {
        return next(new ErrorHandler("Restaurant non trouvé", 404));
    }

    res.status(201).json({
        success: true,
        restaurant
    })
})

exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const restaurantsCount = await Restaurant.countDocuments();
    const restaurants = await Restaurant.find();

    res.status(201).json({
        success: true,
        restaurantsCount,
        restaurants
    })
})
