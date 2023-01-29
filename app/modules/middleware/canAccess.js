const ResponseHelper = require('../../helpers/response');

const FORBIDDEN = 403;

module.exports = async (req, res, next) => {
    const { userContext } = req;

    if (!userContext.isAdmin) {
        return ResponseHelper.customStatus(res, FORBIDDEN);
    }
    next();
};
