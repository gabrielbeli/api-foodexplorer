const { Router } = require('express');

const PurchasesController = require('../controllers/PurchasesController');
const purchasesController = new PurchasesController();
const purchasesRoutes = Router();

purchasesRoutes.post('/', purchasesController.create);
purchasesRoutes.get('/', purchasesController.index);
purchasesRoutes.patch('/:id', purchasesController.update); // Adicione o middleware ensureAuthenticated aqui

module.exports = purchasesRoutes;