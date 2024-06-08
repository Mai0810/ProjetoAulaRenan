const ProdutorModel = require('../models/produtorModel');


exports.adicionarProdutor = ({ NOME, EMAIL, SENHA, DESCRICAO, ENDERECO, TELEFONE }) => {
    return ProdutorModel.adicionarProdutor({NOME, EMAIL, SENHA, DESCRICAO, ENDERECO, TELEFONE});
}

exports.buscarProdutor = (id) => {
    return ProdutorModel.buscarProdutorPorId(id);
}