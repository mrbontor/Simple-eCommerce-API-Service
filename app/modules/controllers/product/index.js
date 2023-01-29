const { ProductService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');
const Logging = require('../../../helpers/logging');

module.exports = {
    createProduct: async (req, res) => {
        try {
            const data = await ProductService.createProduct(req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[CREATE][PRODUCT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const data = await ProductService.getProducts();
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][PRODUCT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getProductById: async (req, res) => {
        try {
            const data = await ProductService.getProductById(req.params.productId);
            ResponseHelper.success(res, data);
        } catch (err) {
            Logging.error(`[GET][PRODUCT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateProduct: async (req, res) => {
        try {
            await ProductService.updateProduct(req.params.productId, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[UPDATE][PRODUCT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    removeProduct: async (req, res) => {
        try {
            await ProductService.remove(req.params.productId);
            ResponseHelper.noContent(res);
        } catch (err) {
            Logging.error(`[DELETE][PRODUCT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    }
};
