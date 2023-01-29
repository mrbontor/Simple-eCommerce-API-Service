const express = require('express');
const App = express();

const { TransactionController } = require('../../../modules/controllers');

const { VerifyToken } = require('../../../modules/middleware');
App.use(VerifyToken);

App.post('/checkout', TransactionController.checkOut);
App.get('/history', TransactionController.getTransactionHistory);

module.exports = App;
