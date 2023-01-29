const { StockService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');
const Logging = require('../../../helpers/logging');

module.exports = {
    createStock: async (req, res) => {
        try {
            const data = await StockService.createStock(req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[CREATE][STOCK] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getAllStocks: async (req, res) => {
        try {
            const data = await StockService.getStocks();
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][STOCK] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getStockById: async (req, res) => {
        try {
            const data = await StockService.getStockById(req.params.stockId);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][STOCK] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateStock: async (req, res) => {
        try {
            await StockService.updateStock(req.params.stockId, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[UPDATE][STOCK] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    removeStock: async (req, res) => {
        try {
            await StockService.remove(req.params.stockId);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[DELETE][STOCK] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    }
};
