const routes = require('express').Router();
const controller = require('../controller/users');

routes.get('/', controller.getUser);
routes.get('/:id', controller.getSingle);
routes.post('/', controller.addUser);
routes.put('/:id', controller.updateUser);
routes.delete('/:id', controller.deleteUser);

module.exports = routes;