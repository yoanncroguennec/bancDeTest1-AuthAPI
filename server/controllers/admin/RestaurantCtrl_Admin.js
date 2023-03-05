/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
// MODELS
const Restaurant = require('../../models/Restaurant')
// MIDDLEWARES ERRORS
const ErrorHandler = require('../../utils/errors/errorHandler');
// UTILS ERRORS
const catchAsyncErrors = require('../../middlewares/errors/catchAsyncErrors');


exports.newRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
        success: true,
        restaurant
    })
})
