/* ***************************************************************************
******************************** USER ********************************
*************************************************************************** */
const User = require('../models/User')


exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}
