const { Router } = require('express');

const App = new Router();

const AuhtApi = require('./auth');
const UserApi = require('./user');
const ProductApi = require('./product');
const StockApi = require('./stock');
const CartApi = require('./cart');
const TransactionApi = require('./transaction');

App.use('/auth', AuhtApi);
App.use('/users', UserApi);
App.use('/products', ProductApi);
App.use('/stocks', StockApi);
App.use('/carts', CartApi);
App.use('/transactions', TransactionApi);

module.exports = App;
