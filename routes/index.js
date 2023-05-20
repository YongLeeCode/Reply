const routes = require('express').Router();

routes.get('/', (req, res, next) => {
    res.send('Hello, This is week 5');
});

routes.use('/users', require('./users'));
routes.use('/replies', require('./replies'));

module.exports = routes;
