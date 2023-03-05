const jwt = require("jsonwebtoken");
// MODELS
const User = require('../../models/User')
// MIDDLEWARES ERRORS
const catchAsyncErrors = require("../errors/catchAsyncErrors");
// UTILS ERRORS
const ErrorHandler = require("../../utils/errors/errorHandler");




// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Connectez-vous d'abord pour accéder à cette ressource.", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.admin)) {
            return next(
                new ErrorHandler(`Vous êtes (${req.user.admin}) n'est pas autorisé à accéder à cette ressource`, 403))
        }
        next()
    }
}