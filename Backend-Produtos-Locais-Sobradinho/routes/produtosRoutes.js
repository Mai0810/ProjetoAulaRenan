const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.post('/salvar/:produtorId', produtosController.salvarProdutos);
router.delete('/:idProduto', produtosController.removerProduto);

module.exports = router;