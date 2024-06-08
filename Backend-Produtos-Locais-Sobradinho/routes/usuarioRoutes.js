const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/login', usuarioController.autenticarUsuario);
router.get('/usuario', usuarioController.retornaUsuario);

module.exports = router;
