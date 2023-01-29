const express = require('express');
const App = express();

const { StockController } = require('../../../modules/controllers');

const { VerifyToken, CanAccess } = require('../../../modules/middleware');
App.use(VerifyToken);

App.get('/', StockController.getAllStocks);
App.post('/', CanAccess, StockController.createStock);
App.get('/:stockId', CanAccess, StockController.getStockById);
App.put('/:stockId', CanAccess, StockController.updateStock);
App.delete('/:stockId', CanAccess, StockController.removeStock);

module.exports = App;
