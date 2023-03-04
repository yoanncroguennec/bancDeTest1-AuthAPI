const User = require('../models/User');
// UTILS JWT
const sendToken = require("../utils/jwt/jwtToken")



exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password, sex} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        avatar: {
            public_id: "784556555",
            url: "https://res.cloudinary.com/dky2vpnyr/image/upload/v1661964405/Pizzeria/pechesDeValdaso_xkwrdx.jpg"
        },
        sex
    })

    sendToken(user, 200, res)
}

exports.login = async (req, res, next) => {
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
}

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Déconnecté'
    })
}

