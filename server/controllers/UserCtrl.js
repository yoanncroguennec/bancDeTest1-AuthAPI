// MODELS
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(201).json({
        success: true,
        users
    })
}
