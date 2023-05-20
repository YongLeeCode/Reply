const routes = require('express').Router();
const controller = require('../controller/replies');

routes.get('/', controller.getReplies);
routes.get('/:id', controller.getOneReply);
routes.post('/', controller.addReply);
routes.put('/:id', controller.updateReply);
routes.delete('/:id', controller.deleteReply);

module.exports = routes;