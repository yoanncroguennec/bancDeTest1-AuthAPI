/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
const Restaurant = require('../../models/Restaurant')


exports.newRestaurant = async (req, res, next) => {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
        success: true,
        restaurant
    })
}
