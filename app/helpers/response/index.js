const StringMath = require('string-math');

const TOKEN_EXPIRY = StringMath(process.env.APP_TOKEN_EXPIRED) || '1m';
const REFRESH_TOKEN_EXPIRY = StringMath(process.env.APP_REFRESH_TOKEN_EXPIRED) || '1m';
const DEVICE_ID_EXPIRY = StringMath(process.env.APP_DEVICE_ID_EXPIRED) || '1m';

const SUCCESS_CREATED = 201;
const SUCCESS_NO_CONTENT = 204;
const BAD_REQUEST = 400;

const COOKIE_REFRESH_TOKEN = 'RTOKEN';
const COOKIE_DEVICE_ID = 'DID';
const { ValidationError } = require('../exceptions');
const isSecure = process.env.NODE_ENV == 'development';

module.exports = {
    success: (res, data, message = 'Success') => {
        res.send({
            status: true,
            message: message,
            data
        });
    },
    created: (res, data) => {
        res.status(SUCCESS_CREATED).send({
            status: true,
            // message: message,
            data
        });
    },
    noContent: (res) => {
        res.sendStatus(SUCCESS_NO_CONTENT);
    },

    successLogIn: (res, data, message = 'Success') => {
        // res.cookie(COOKIE_TOKEN, data.accessToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "None",
        //     maxAge: TOKEN_EXPIRY,
        // });

        res.cookie(COOKIE_REFRESH_TOKEN, data.refreshToken, {
            httpOnly: true,
            secure: isSecure,
            sameSite: 'None',
            maxAge: REFRESH_TOKEN_EXPIRY
        });
        res.cookie(COOKIE_DEVICE_ID, data.deviceId, {
            httpOnly: true,
            secure: isSecure,
            sameSite: 'None',
            maxAge: DEVICE_ID_EXPIRY
        });

        res.send({
            status: true,
            message: message,
            data: { accessToken: data.accessToken }
        });
    },

    successLogOut: (res) => {
        res.clearCookie(COOKIE_REFRESH_TOKEN, {
            httpOnly: true,
            sameSite: 'None',
            secure: isSecure
        });

        res.sendStatus(SUCCESS_NO_CONTENT);
    },

    customStatus: (res, statusCode) => {
        res.sendStatus(statusCode);
    },

    customStatusWithMessage: (res, statusCode, message) => {
        res.status(statusCode).send({
            status: false,
            message: message
        });
    },

    error: (res, error) => {
        let response = {};
        response.status = error.status;
        response.message = error.message;

        if (error instanceof ValidationError && Array.isArray(error.errors)) {
            response.errors = error.errors;
        }

        if (error instanceof ValidationError && Array.isArray(error.errors)) {
            response.errors = error.errors;
        }
        res.status(error.statusCode ? error.statusCode : BAD_REQUEST).send(response);
    }
};
