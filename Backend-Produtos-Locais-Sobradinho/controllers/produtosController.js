/*const produtosService = require('../services/produtosService');

exports.salvarProdutos = async (req, res) => {
  try {
    console.log("controller salvar produtos");
    console.log(req.body);
      const produtos = await produtosService.salvar(req.body);
      res.json(produtos);
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
};*/

const produtosService = require('../services/produtosService');

exports.salvarProdutos = async (req, res) => {
    const produtorId = req.params.produtorId;
    console.log("id produtor recebido na controller: " + produtorId);
    const produtos = req.body;
    try {
        const resultado = await produtosService.salvar(produtorId, produtos);
        res.json(resultado);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.listarProdutos = async(req, res) => {
  try {
    const resultado = await produtosService.listar(req.params.produtorId);
    res.json(resultado);
  } catch (err) {
      res.status(500).send(err.message);
  }
}

exports.removerProduto = async(req, res) => {
  try {
    const resultado = await produtosService.removerProduto(req.params.idProduto);
    console.log("respondendo final remover produto - id produto: " + req.params.idProduto);
    res.json(resultado);
  } catch (err) {
      res.status(500).send(err.message);
  }
}


