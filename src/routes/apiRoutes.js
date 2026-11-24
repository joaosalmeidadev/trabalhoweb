const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiControllers');

router.get('/receitas', apiController.buscarReceitas);
router.get('/receitas/:id', apiController.buscarPorId);
router.post('/receitas', apiController.adicionarReceita);

module.exports = router;