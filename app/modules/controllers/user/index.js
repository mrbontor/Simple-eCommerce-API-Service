const { UserService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');
const Logging = require('../../../helpers/logging');

module.exports = {
    createUser: async (req, res) => {
        try {
            const data = await UserService.createUser(req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[CREATE][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const data = await UserService.getUserById(req.params.idUser);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getUserProfile: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            const data = await UserService.getUserById(idUser);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateRoleUser: async (req, res) => {
        try {
            await UserService.updateRoleUser(req.params.idUser, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[UPDATE][ROLE][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateStatusUser: async (req, res) => {
        try {
            await UserService.updateStatusUser(req.params.idUser, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[UPDATE][STATUS][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateCredentialUser: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            await UserService.updateCredentialUser(idUser, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[UPDATE][CREDENTIAL][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateCredentialUserByAdmin: async (req, res) => {
        try {
            await UserService.updateCredentialUser(req.params.idUser, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(
                `[UPDATE][CREDENTIAL][USER][BY ADMIN] >>>>> ${JSON.stringify(err.message)}`
            );
            ResponseHelper.error(res, err);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const data = await UserService.getUsers();
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            await UserService.updateUser(idUser, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[UPDATE][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    removeUser: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            await UserService.remove(req.params.idUser, idUser);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[DELETE][USER] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    }
};
