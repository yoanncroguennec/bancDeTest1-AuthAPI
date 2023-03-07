// MODELS
const User = require('../models/User');
// UTILS JWT
const sendToken = require("../utils/jwt/jwtToken")
const cloudinary = require('cloudinary');


// Arguments ("res" & "req") de la callback
exports.register = async (req, res, next) => {

    const { firstName, lastName, email, password, sex} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        avatar: {
            public_id: "1245685gtfdfy",
            url: "https://res.cloudinary.com/dky2vpnyr/image/upload/v1678023918/avatars/ggu8oaacxs146nckismt.jpg"
        },
        sex
    })

    sendToken(user, 200, res)
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) return res.status(400).json({ message: "Please enter email & password" });

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

   if (!user) return res.status(401).json({ message: "Invalid Email or Password" });

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) return res.status(401).json({ message: "Invalid Password" });

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
