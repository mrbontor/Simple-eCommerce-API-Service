const Validator = require('../../../helpers/validateSchema');
const { TransactionSchema } = require('../../schemas');
const { CartRepository, TransactionRepository } = require('../../repositories');
const { UnprocessableEntityError, ApplicationError } = require('../../../helpers/exceptions');
const CartService = require('../cart');
const StockService = require('../stock');
const { v4: Uuidv4 } = require('uuid');

const removeInfoStock = (carts) => {
    const results = [];
    carts.details.forEach((cart) => {
        const tempItem = Object.assign({}, cart);
        delete tempItem.originProduct;
        results.push(tempItem);
    });
    return results;
};
const transactionData = (idUser, carts, amountPaid) => {
    return {
        idUser: idUser,
        invoice: Uuidv4(),
        details: removeInfoStock(carts),
        total: carts.grandTotal,
        amountPaid: amountPaid,
        status: 'done'
    };
};

const upateBulkStock = (cacheCart) => {
    const { details } = cacheCart;

    const updateStock = details.map(async (cart) => {
        const payloadStock = {
            type: 'quantity',
            quantity: cart.quantity
        };

        await StockService.reduceStockOn(cart.originProduct.idStock, payloadStock);
    });
    return Promise.all(updateStock);
};

module.exports = {
    createTransaction: async (idUser, payload) => {
        const cacheCart = await CartService.getCart(idUser);

        await Validator.validateSchema(payload, TransactionSchema.POST);
        const { amountPaid } = payload;
        if (amountPaid < cacheCart.grandTotal) {
            throw new UnprocessableEntityError(`Insuficient Amount Paid`);
        }

        const dataTransaction = transactionData(idUser, cacheCart, amountPaid);
        const transaction = await TransactionRepository.save(dataTransaction);
        if (!transaction) {
            throw new ApplicationError(`Something wen wrong, please try again`);
        }
        await upateBulkStock(cacheCart);
        await CartService.removeCart(idUser);

        return { ...cacheCart, amountPaid };
    },
    getTransaction: async (userContext, payload) => {
        const { idUser, isAdmin } = userContext;
        if (!isAdmin) {
            return await TransactionRepository.getAllUserTransaction(idUser);
        }
        const getAllTransaction = TransactionRepository.getAll();
        return getAllTransaction;
    },

    removeTransaction: async (idUser) => {
        return await CartRepository.remove(idUser);
    }
};
