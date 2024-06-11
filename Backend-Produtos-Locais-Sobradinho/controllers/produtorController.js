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

exports.alterarDados = async (req, res) => {
    try {
      console.log("alterar dados usuario:" + req.params.idUsuario);
      console.log(req.body);
      const idUsuario = Number(req.params.idUsuario);
      const produtor = await produtorService.atualizarProdutor(idUsuario, req.body);
      res.json(produtor);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  } 
}

  //excluir produtor
exports.removerProdutor = async (req, res) => {
    try {
       const body = await produtorService.removerProdutor(req.params.idProdutor);
        res.status(200).json(body);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover produtor', error: error.message });
    }

};
