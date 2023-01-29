const { CartService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');
const Logging = require('../../../helpers/logging');

module.exports = {
    createCart: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            const data = await CartService.createCart(idUser, req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[CREATE][CART] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getCart: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            const data = await CartService.getCart(idUser);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][CART] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    removeCart: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            const data = await CartService.removeCart(idUser);
            ResponseHelper.noContent(res, data);
        } catch (err) {
            Logging.error(`[REMOVE][CART] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    }
};
