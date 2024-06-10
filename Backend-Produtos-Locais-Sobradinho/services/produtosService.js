const ProdutosModel = require('../models/produtosModel');

exports.listar = async (idProdutor) => {
    return ProdutosModel.listarProdutos(idProdutor);
}

exports.removerProduto = async (idProdutor) => {
    return ProdutosModel.removerProduto(idProdutor);
}

exports.salvar = async (produtorId, listaProdutos) => {
    const produtosValidos = listaProdutos.filter(validarProduto);

    let results = [];
    const produtosParaSalvar = produtosValidos.map(produto => {
        if (produtoExistente(produto)) {
            console.log("atualizando um produto existente");
            return ProdutosModel.atualizarProduto({
                ID_PRODUTO: produto.ID_PRODUTO,
                NOME: produto.NOME,
                PRECO: produto.PRECO,
                DESCRICAO: produto.DESCRICAO,
                'produtor_ID_PRODUTOR': produtorId
            });
        } else {
            console.log("criando um produto novo");
            return ProdutosModel.criarProduto({
                NOME: produto.NOME,
                PRECO: produto.PRECO,
                DESCRICAO: produto.DESCRICAO,
                'produtor_ID_PRODUTOR': produtorId
            });
        }
    });

    results = await Promise.all(produtosParaSalvar);
    console.log("retorno de lista de produtos. qtd:" + results.length);
    console.log(results);
    return results;
};

const validarProduto = (data) => {
    return data && data.NOME && data.PRECO;
};

const produtoExistente = (data) => {
    return data && data.ID_PRODUTO && !isNaN(Number(data.ID_PRODUTO));
};
