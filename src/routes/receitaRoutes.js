const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

router.get('/', receitaController.listar);
router.get('/buscar', receitaController.buscar);
router.post('/criar', receitaController.criar);

module.exports = router;