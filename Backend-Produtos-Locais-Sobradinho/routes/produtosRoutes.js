const express = require('express');
const produtorController = require('../controllers/produtorController');
const router = express.Router();


router.post('/adicionar', produtorController.adicionarProdutor);
router.get('/:id', produtorController.buscarProdutor)


module.exports = router;