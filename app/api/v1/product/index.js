const express = require('express');
const App = express();

const { ProductController } = require('../../../modules/controllers');

const { VerifyToken, CanAccess } = require('../../../modules/middleware');
App.use(VerifyToken);

App.get('/', ProductController.getAllProducts);

// .patch('/status/:productId', ProductController.updateStatusProduct)
App.post('/', CanAccess, ProductController.createProduct);
App.get('/:productId', ProductController.getProductById);
App.put('/:productId', CanAccess, ProductController.updateProduct);
App.delete('/:productId', CanAccess, ProductController.removeProduct);

module.exports = App;
