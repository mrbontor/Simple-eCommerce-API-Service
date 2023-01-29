const express = require('express');
const App = express();

const { UserController } = require('../../../modules/controllers');

const { VerifyToken, CanAccess } = require('../../../modules/middleware');
App.use(VerifyToken);

App.get('/', CanAccess, UserController.getAllUsers);
App.post('/', CanAccess, UserController.createUser);
App.patch('/role/:idUser', CanAccess, UserController.updateRoleUser);
App.patch('/status/:idUser', CanAccess, UserController.updateStatusUser);
App.patch('/password', UserController.updateCredentialUser);
App.patch('/password/:idUser', CanAccess, UserController.updateCredentialUserByAdmin);
App.get('/profile', UserController.getUserProfile);
App.get('/:idUser', CanAccess, UserController.getUserById);
// App.put('/:idUser', UserController.updateUser)
App.delete('/:idUser', CanAccess, UserController.removeUser);

module.exports = App;
