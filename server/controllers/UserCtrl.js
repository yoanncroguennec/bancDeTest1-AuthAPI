const User = require('../models/User')

exports.getAllUsers = async (req, res, next) => {
    const usersCount = await User.countDocuments();
    const users = await User.find();

    res.status(201).json({
        success: true,
        usersCount,
        users
    })
}
