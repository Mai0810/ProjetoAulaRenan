const express = require('express');
const produtorController = require('../controllers/produtorController');
const produtosController = require('../controllers/produtosController');
const router = express.Router();


router.post('/adicionar', produtorController.adicionarProdutor);
router.get('/:id', produtorController.buscarProdutor)
router.get('/:produtorId/produtos', produtosController.listarProdutos);
router.put('/:idUsuario', produtorController.alterarDados);
router.delete('/:idProdutor', produtorController.removerProdutor);


module.exports = router;