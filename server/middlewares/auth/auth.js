const jwt = require("jsonwebtoken");
// MODELS
const User = require('../../models/User')



// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "Connectez-vous d'abord pour accéder à cette ressource." });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
}
