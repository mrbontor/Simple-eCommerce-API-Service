const { VerifyAccessToken } = require('../../libraries/encrypting/jwtLibs');
const ResponseHelper = require('../../helpers/response');
const { UserService } = require('../services');
const Logging = require('../../helpers/logging');

const TOKEN_SECRET = process.env.APP_TOKEN_SECRET;
const UNAUTHORIZED = 401;
const UNPROCESSABLE_ENTITY = 422;
const COOKIE_REFRESH_TOKEN = 'RTOKEN';

//handle readeable cookie for development
const isSecure = process.env.NODE_ENV != 'development';

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer '))
            return ResponseHelper.customStatus(res, UNAUTHORIZED);

        const token = authHeader.split(' ')[1];

        const isTokenValid = await VerifyAccessToken(token, TOKEN_SECRET);
        Logging.info(`[VERIFY] >>>>> ${JSON.stringify(isTokenValid)}`);
        if (!isTokenValid) {
            return ResponseHelper.customStatus(res, UNAUTHORIZED);
        }

        const user = await UserService.getAllDataUser(isTokenValid.data.idUser);

        if (!user.isActive) {
            res.clearCookie(COOKIE_REFRESH_TOKEN, {
                httpOnly: isSecure,
                sameSite: 'None',
                secure: isSecure
            });
            return ResponseHelper.customStatusWithMessage(
                res,
                UNPROCESSABLE_ENTITY,
                'Your account has been disactivated, please contact adminstrator if you think this is wrong!'
            );
        }

        if (user.token.length === 0) {
            res.clearCookie(COOKIE_REFRESH_TOKEN, {
                httpOnly: isSecure,
                sameSite: 'None',
                secure: isSecure
            });
            return ResponseHelper.customStatusWithMessage(
                res,
                UNAUTHORIZED,
                'Please relogin to use the our services'
            );
        }

        req.userContext = isTokenValid.data;
        next();
    } catch (err) {
        Logging.error(`[VERIFY][TOKEN][MIDDLEWARE][ERROR] >>>>> ${JSON.stringify(err.message)}`);
        ResponseHelper.customStatus(res, UNAUTHORIZED);
    }
};
