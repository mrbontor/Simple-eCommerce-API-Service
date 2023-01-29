const ErrorHandler = require('./error');
const VerifyToken = require('./isAuthenticated');
const CanAccess = require('./canAccess');

module.exports = {
    ErrorHandler,
    VerifyToken,
    CanAccess
};
