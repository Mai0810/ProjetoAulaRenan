const produtorService = require('../services/produtorService');

exports.adicionarProdutor = async (req, res) => {
    try {
      const token = await produtorService.adicionarProdutor(req.body);
      res.json(token);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  };

exports.buscarProdutor = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const produtor = await produtorService.buscarProdutor(id);
        res.json(produtor);
      } catch (err) {
        res.status(err.status || 500).send(err.message);
      }
};
