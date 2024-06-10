const usuarioService = require('../services/usuarioService');

exports.autenticarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.autenticarUsuario(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
};

exports.adicionarUsuario = async (req, res) => {
    try {
      const token = await usuarioService.adicionarUsuario(req.body);
      res.json(token);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  };


 
exports.retornaUsuario = async (req, res) => {
    try {
        res.json({"usuario":"maize", "login":"MaizeRs"});
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
};