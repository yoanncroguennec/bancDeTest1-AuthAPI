/* ****************************************************************
************************** ADMINISTRATOR **************************
**************************************************************** */
// MODELS
const User = require('../../models/User')
// MIDDLEWARES ERRORS
const ErrorHandler = require('../../utils/errors/errorHandler');
// UTILS ERRORS
const catchAsyncErrors = require('../../middlewares/errors/catchAsyncErrors');


exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const usersCount = await User.countDocuments();
    const users = await User.find();

    res.status(201).json({
        success: true,
        usersCount,
        users
    })
})
