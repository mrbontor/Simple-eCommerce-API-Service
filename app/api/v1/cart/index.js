const express = require('express');
const App = express();

const { CartController } = require('../../../modules/controllers');

const { VerifyToken } = require('../../../modules/middleware');
App.use(VerifyToken);

App.get('/', CartController.getCart);
App.post('/', CartController.createCart);
App.delete('/', CartController.removeCart);

module.exports = App;
