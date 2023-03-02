// La class "ErrorHandler" hérite "Error"
class ErrorHandler extends Error {
    // Méthode "constructor" : Utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;