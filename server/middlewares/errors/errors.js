// UTILS ERRORS
const ErrorHandler = require('../../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Erreur de serveur interne';

    res.status(err.statusCode).json({
        success: false,
        error:err
    })

}