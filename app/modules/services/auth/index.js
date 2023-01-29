const Validator = require('../../../helpers/validateSchema');
const { AuthSchema } = require('../../schemas');
const { UserRepository } = require('../../repositories');
const {
    Encrypt,
    Decrypt,
    VerifyHashPassword,
    GenHashPassword
} = require('../../../libraries/encrypting/AEAD');
const {
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    DecodeJwtToken
} = require('../../../libraries/encrypting/jwtLibs');

const { UnprocessableEntityError, ForbiddenError } = require('../../../helpers/exceptions');

const { v4: Uuidv4 } = require('uuid');
const Dayjs = require('dayjs');
const UnAuthorizedError = require('../../../helpers/exceptions/unAuthorizedError');

/**
 *
 * @param {object} data
 */
const setJwtPayload = (data) => {
    return {
        idUser: data.id,
        username: data.username,
        email: data.email,
        isActive: data.isActive,
        isAdmin: data.isAdmin
    };
};

/**
 *
 * @param {Array} token
 * @param {String} refreshToken
 * @returns
 */
const removeCurrentToken = (token, refreshToken) => {
    const objIndex = token.findIndex((el) => el.token === refreshToken);

    if (objIndex > -1) token.splice(objIndex, 1);
    return token;
};

/**
 *
 * @param {object} dataUser
 * @param {object} userPayload
 * @param {string} loginId
 */
const generateToken = async (dataUser, userPayload, loginId) => {
    const { deviceId } = userPayload;

    const payload = setJwtPayload(dataUser);

    const accessToken = await SignAccessToken(payload);
    const refreshToken = await SignRefreshToken(
        Encrypt({
            email: dataUser.email,
            loginId: loginId
        })
    );

    const now = Dayjs();
    const modified = now.format();

    //identify existing token and replace/remove
    if (typeof dataUser.token !== 'undefined') {
        const oldRefreshToken = dataUser.token.filter(
            (el) => el.token === userPayload.refreshToken && el.deviceId === userPayload.deviceId // maybe need to removed.
        );

        /*
            check existing token at the same device
            Scenario :
            1) User logs in but never uses Refresh Token (RT) and does not logout
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */

        if (oldRefreshToken.length > 0) {
            const newToken = removeCurrentToken(dataUser.token, userPayload.refreshToken);
            await UserRepository.update(
                { token: newToken }, // can use {token : []}
                dataUser.id
            );
        }
    }

    // store new refresh token
    const dataSet = {
        token: [
            ...dataUser.token,
            {
                token: refreshToken,
                ipAddress: userPayload.ipAddress,
                userAgent: userPayload.userAgent,
                deviceId: userPayload.deviceId,
                updateAt: modified
            }
        ]
    };

    await UserRepository.update(dataSet, dataUser.id);

    return { accessToken, refreshToken, deviceId };
};

module.exports = {
    signIn: async (payload) => {
        const dataPayload = await Validator.validateSchema(payload, AuthSchema.SIGNIN);

        const user = await UserRepository.getOne({
            username: dataPayload.username
        });
        if (!user) {
            // always return 401 for wrong credential or user not found
            throw new UnAuthorizedError();
        }
        if (!user.isActive) {
            //ensure token be removed for unactive user
            await UserRepository.update({ token: [] }, { id: user.id });
            throw new UnprocessableEntityError(
                'Your account has been deactive, please contact your administrator!'
            );
        }

        const isPasswordValid = VerifyHashPassword(user.infoLogin, dataPayload.password);
        if (!isPasswordValid) {
            // throw new BadRequestError("Incorect Password or Username!");
            throw new UnAuthorizedError();
        }

        const loginId = Uuidv4();

        const token = await generateToken(user, dataPayload, loginId);

        return token;
    },

    singUp: async (payload) => {
        const user = await Validator.validateSchema(payload, AuthSchema.SIGNUP);

        const isExistUsername = await UserRepository.getOne({ username: payload.username });
        if (isExistUsername) {
            throw new UnprocessableEntityError('Username is already used!');
        }

        const isExistEmail = await UserRepository.getOne({ email: payload.email });
        if (isExistEmail) {
            throw new UnprocessableEntityError('Email is already used!');
        }

        const infoLogin = GenHashPassword(payload.password);
        const dataUser = userData(user, { infoLogin });

        return await UserRepository.save(dataUser, infoLogin);
    },

    /**
     * Refresh token only used once!
     * @param {object} payload
     */
    refreshToken: async (payload) => {
        try {
            const dataPayload = await Validator.validateSchema(payload, AuthSchema.REFRESH_TOKEN);

            const isTokenValid = await VerifyRefreshToken(dataPayload.refreshToken);

            const decryptedPayload = JSON.parse(Decrypt(isTokenValid.data));

            const clause = { email: decryptedPayload.email };

            const user = await UserRepository.getOne(clause);
            if (!user) {
                throw new ForbiddenError();
            }

            //check token exist
            if (typeof user.token !== 'undefined' && user.token.length > 0) {
                const oldRefreshToken = user.token.filter(
                    (el) => el.token === dataPayload.refreshToken
                );

                if (oldRefreshToken.length > 0) {
                    //remove current refresh token
                    const newToken = removeCurrentToken(user.token, dataPayload.refreshToken);
                    await UserRepository.updateBy({ token: newToken }, clause);
                }
            } else {
                //the token has stolen, he mess with us
                throw new ForbiddenError();
            }

            const jwtPayload = setJwtPayload(user);

            //valid, generate new access token
            const newAccessToken = await SignAccessToken(jwtPayload);
            const newRefreshToken = await SignRefreshToken(
                Encrypt({
                    email: user.email,
                    loginId: Uuidv4()
                })
            );

            const dataSet = {
                token: [
                    ...user.token,
                    {
                        token: newRefreshToken,
                        ipAddress: dataPayload.ipAddress,
                        userAgent: dataPayload.userAgent,
                        deviceId: dataPayload.deviceId
                    }
                ]
            };

            await UserRepository.updateBy(dataSet, clause);

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                deviceId: dataPayload.deviceId
            };
        } catch (err) {
            //detect reuse token, anomaly
            if (err.message === 'jwt expired') {
                const expiredToken = await DecodeJwtToken(payload.refreshToken);
                const decodeExpiredToken = JSON.parse(Decrypt(expiredToken.data));

                //remove all token
                await UserRepository.updateBy({ token: [] }, { email: decodeExpiredToken.email });

                throw new ForbiddenError();
            } else {
                throw err;
            }
        }
    },

    signOut: async (payload) => {
        const dataPayload = await Validator.validateSchema(payload, AuthSchema.SIGNOUT);

        const isTokenValid = await VerifyRefreshToken(dataPayload.refreshToken);

        const decryptedPayload = JSON.parse(Decrypt(isTokenValid.data));
        const clause = { email: decryptedPayload.email };
        const user = await UserRepository.getOne(clause);
        if (!user) {
            throw new UnAuthorizedError();
        }

        let removeToken = {};

        //check token exist
        if (typeof user.token !== 'undefined') {
            const oldRefreshToken = user.token.filter(
                (el) => el.token === dataPayload.refreshToken
            );

            if (oldRefreshToken.length > 0) {
                const newToken = removeCurrentToken(user.token, dataPayload.refreshToken);
                removeToken = { token: [...newToken] };
            }
        }

        //Alldevices = true, remove all token
        if (dataPayload.allDevices) {
            removeToken = { token: [] };
        }

        await UserRepository.updateBy(removeToken, clause);

        return true;
    }
};
