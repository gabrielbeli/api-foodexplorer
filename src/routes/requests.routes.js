const { Router } = require('express');

const RequestsController = require('../controllers/RequestsController');

const requestsController = new RequestsController();

const requestsRoutes = Router();

requestsRoutes.post('/', requestsController.create);
requestsRoutes.get('/', requestsController.index);
requestsRoutes.delete('/:id', requestsController.delete);

module.exports = requestsRoutes;