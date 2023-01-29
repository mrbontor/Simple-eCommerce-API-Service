const { TransactionService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');
const Logging = require('../../../helpers/logging');

module.exports = {
    checkOut: async (req, res) => {
        try {
            const { idUser } = req.userContext;
            const data = await TransactionService.createTransaction(idUser, req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[CREATE][TRANSACTION][CHECKOUT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getTransactionHistory: async (req, res) => {
        try {
            const data = await TransactionService.getTransaction(req.userContext, req.params);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][HISTORY][TRANSACTION] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    }
};
