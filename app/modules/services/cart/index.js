const Validator = require('../../../helpers/validateSchema');
const { CartSchema } = require('../../schemas');
const { CartRepository, ProductRepository } = require('../../repositories');
const { UnprocessableEntityError, NotFoundError } = require('../../../helpers/exceptions');

const extractProductIds = (products) => {
    const productIds = [];
    products.forEach((product) => {
        productIds.push(product.idProduct);
    });
    return productIds;
};

const validateStock = (payload, data) => {
    payload.forEach((el) => {
        data.forEach((item) => {
            if (el.idProduct == item.id && el.quantity > item.stock.quantity) {
                throw new UnprocessableEntityError(`Insuficient quantity of ${item.name}`);
            }
        });
    });
};

const cartRespose = (cache, actualData) => {
    const results = [];
    cache.forEach((el) => {
        let preData = el;
        actualData.forEach((item) => {
            if (el.idProduct == item.id) {
                //need to check if stock is still available
                preData.status = el.quantity < item.stock.quantity ? true : false;
                preData.subTotal = el.quantity * item.stock.price; // use original price of product, it might be updated sometimes
                preData.name = item.name; //not really need, can be deleted.
                preData.originProduct = item.stock;
            }
        });
        results.push(preData);
    });
    return results;
};

module.exports = {
    createCart: async (idUser, payload) => {
        const { data } = await Validator.validateSchema(payload, CartSchema.POST);

        const productIds = extractProductIds(data);
        const getProducts = await ProductRepository.getAllBy({ ids: productIds });

        validateStock(data, getProducts);

        return await CartRepository.save(idUser, data);
    },
    getCart: async (idUser) => {
        const cache = await CartRepository.get(idUser);
        if (!cache)
            throw new NotFoundError('The shoppping cart is empty, please select some items first!');

        const productIds = extractProductIds(cache);
        const getProducts = await ProductRepository.getAllBy({ ids: productIds });

        const details = cartRespose(cache, getProducts);
        const grandTotal = details.reduce((prev, next) => prev.subTotal + next.subTotal);
        return { details, grandTotal };
    },

    removeCart: async (idUser) => {
        return await CartRepository.remove(idUser);
    }
};
