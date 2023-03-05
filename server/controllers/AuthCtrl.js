// MODELS
const User = require('../models/User');
// MIDDLEWARES ERRORS
const ErrorHandler = require('../utils/errors/errorHandler');
// UTILS ERRORS
const catchAsyncErrors = require('../middlewares/errors/catchAsyncErrors');
// UTILS JWT
const sendToken = require("../utils/jwt/jwtToken")
const cloudinary = require('cloudinary');


// Arguments ("res" & "req") de la callback
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { firstName, lastName, email, password, sex} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        },
        sex
    })

    sendToken(user, 200, res)
})

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }


    // Function "sendToken" in "UTILS JWT" pour stocker le token dans le cookie
    sendToken(user, 200, res)
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Déconnecté'
    })
})
