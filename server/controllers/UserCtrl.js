// MODELS
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(201).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
