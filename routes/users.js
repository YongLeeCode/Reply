const routes = require('express').Router();
const controller = require('../controller/users');

routes.get('/', controller.getUser);
routes.get('/:id', controller.getSingle);

module.exports = routes;