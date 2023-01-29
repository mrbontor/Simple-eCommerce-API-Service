const Validator = require('../../../helpers/validateSchema');
const { UserSchema } = require('../../schemas');
const { UserRepository } = require('../../repositories');
const {
    UnprocessableEntityError,
    NotFoundError,
    BadRequestError
} = require('../../../helpers/exceptions');
const { GenHashPassword, VerifyHashPassword } = require('../../../libraries/encrypting/AEAD');

const SUPER_ADMIN_USERNAME = process.env.SUPER_ADMIN_USERNAME;

const userData = (payload, other = {}) => {
    const now = new Date();
    let defaultData = { ...other };

    delete payload.password;
    return { ...payload, ...defaultData };
};

const userFieldResponse = (user) => {
    return {
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        isAdmin: user.isAdmin
    };
};

module.exports = {
    createUser: async (payload) => {
        const user = await Validator.validateSchema(payload, UserSchema.POST);

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

        const add = await UserRepository.save(dataUser, infoLogin);
        return userFieldResponse(user);
    },

    getUserById: async (id) => {
        const user = await UserRepository.getById(id);
        if (!user) {
            throw new NotFoundError('User is not found!');
        }
        return userFieldResponse(user);
    },

    getAllDataUser: async (id) => {
        const user = await UserRepository.getById(id);
        if (!user) {
            throw new NotFoundError('User is not found!');
        }
        return user;
    },

    updateRoleUser: async (idUser, payload) => {
        const userRole = await Validator.validateSchema(payload, UserSchema.PATCH_ROLE);

        return await UserRepository.update(userRole, idUser);
    },

    updateStatusUser: async (idUser, payload) => {
        const userStatus = await Validator.validateSchema(payload, UserSchema.PATCH_STATUS);

        return await UserRepository.update(userStatus, idUser);
    },

    updateCredentialUser: async (idUser, payload) => {
        const userCredential = await Validator.validateSchema(payload, UserSchema.PATCH_PASSWORD);

        const getUser = await UserRepository.getById(idUser);
        const isPasswordValid = VerifyHashPassword(getUser.infoLogin, userCredential.password);

        if (!isPasswordValid) {
            throw new BadRequestError('Incorect Password');
        }

        const newPassword = GenHashPassword(userCredential.newPassword);

        const { value } = await UserRepository.update(
            {
                infoLogin: newPassword,
                token: []
            },
            idUser
        );
        return value;
    },

    updateUser: async (id, payload) => {
        const dataUser = await Validator.validateSchema(payload, UserSchema.PUT);
        const isExist = await UserRepository.getById(id);
        if (!isExist) {
            throw new NotFoundError('User not found!');
        }

        return await UserRepository.update(dataUser, id);
    },
    getUsers: async () => {
        const users = await UserRepository.getAll();
        if (users && users.length === 0) {
            throw new NotFoundError('User not found!');
        }
        return users;
    },
    remove: async (id, currentSessionId) => {
        const user = await UserRepository.getById(id);
        if (!user) {
            throw new NotFoundError('User not found!');
        }
        if (user && user.username === SUPER_ADMIN_USERNAME) {
            throw new UnprocessableEntityError('He is Zeus, you cant delete him!!!');
        }

        if (user && currentSessionId === id) {
            throw new UnprocessableEntityError('Suicide is prohibited!!');
        }

        return await UserRepository.remove(user.id);
    }
};
