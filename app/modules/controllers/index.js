const AuthController = require('./auth');
const UserController = require('./user');
const ProductController = require('./product');
const StockController = require('./stock');
const CartController = require('./cart');
const TransactionController = require('./transaction');

module.exports = {
    ProductController,
    StockController,
    CartController,
    UserController,
    AuthController,
    TransactionController
};
