const Validator = require('../../../helpers/validateSchema');
const { StockSchema } = require('../../schemas');
const { StockRepository, ProductRepository } = require('../../repositories');
const { UnprocessableEntityError, NotFoundError } = require('../../../helpers/exceptions');

module.exports = {
    createStock: async (payload) => {
        const dataStock = await Validator.validateSchema(payload, StockSchema.POST);
        const isProductExist = await ProductRepository.getById(payload.idProduct);
        if (!isProductExist) {
            throw new NotFoundError('Product is not found');
        }

        const isExist = await StockRepository.getOneBy({ idProduct: payload.idProduct });
        if (isExist) {
            throw new UnprocessableEntityError(
                'Stock for the product is already exist, please performs PUT!'
            );
        }

        return await StockRepository.save(dataStock);
    },
    getStockById: async (id) => {
        const stock = await StockRepository.getOneBy({ id: id });
        if (!stock) {
            throw new NotFoundError('Stock is not found!');
        }
        return stock;
    },
    updateStock: async (id, payload) => {
        const dataStock = await Validator.validateSchema(payload, StockSchema.PUT);
        const isExist = await StockRepository.getById(id);
        if (!isExist) {
            throw new NotFoundError('Stock not found!');
        }

        return await StockRepository.update(dataStock, id);
    },

    getStocks: async () => {
        const stock = await StockRepository.getAll();
        if (stock && stock.length === 0) {
            throw new NotFoundError('Stock not found!');
        }
        return stock;
    },
    remove: async (id) => {
        const stock = await StockRepository.getOneBy({ id: id });
        const remove = await StockRepository.remove(stock.id);
        if (remove) {
            await ProductRepository.removeBy({ id: stock.idProduct });
        }

        return remove;
    },

    /**
     * this service will be used to increase stock quantity and/or price
     * this can be upated depends on company needs
     * this function will be used in Transaction Api
     *
     * @param {String} idStock
     * @param {Object} payload
     * @returns {Array}
     */
    addStockOn: async (idStock, payload) => {
        await Validator.validateSchema(payload, StockSchema.PATCH);

        const getStock = await StockRepository.getById(idStock);
        if (!getStock) {
            throw new NotFoundError('Stock not found!');
        }

        return await StockRepository.update(
            {
                [payload['type']]: getStock[payload['type']] + payload[payload['type']]
            },
            idStock
        );
    },

    reduceStockOn: async (idStock, payload) => {
        await Validator.validateSchema(payload, StockSchema.PATCH);

        const getStock = await StockRepository.getById(idStock);
        if (!getStock) {
            throw new NotFoundError('Stock not found!');
        }

        return await StockRepository.update(
            {
                [payload['type']]: getStock[payload['type']] - payload[payload['type']]
            },
            idStock
        );
    }

    /**
     * TODO those function can be grouped to a single funtion
     */
};
