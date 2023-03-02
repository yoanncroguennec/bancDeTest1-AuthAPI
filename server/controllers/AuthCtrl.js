const User = require('../models/User');

exports.register = async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        user
    })
}

// exports.loginUser = async (req, res, next) => {
//     const { email, password } = req.body;

//     // Checks if email and password is entered by user
//     if (!email || !password) {
//         return next(new ErrorHandler('Please enter email & password', 400))
//     }

//     // Finding user in database
//     const user = await User.findOne({ email }).select('+password')

//     if (!user) {
//         return next(new ErrorHandler('Invalid Email or Password', 401));
//     }

//     // Checks if password is correct or not
//     const isPasswordMatched = await user.comparePassword(password);

//     if (!isPasswordMatched) {
//         return next(new ErrorHandler('Invalid Email or Password', 401));
//     }

//     sendToken(user, 200, res)
// }
