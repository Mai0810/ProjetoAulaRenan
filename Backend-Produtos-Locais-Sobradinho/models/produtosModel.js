const knex = require('../config/db'); // Importa a configuração de conexão
exports.criarProduto = async (produto) => {
    const idProdutosAdicionados = await knex('produto').insert(produto).returning("ID_PRODUTO");
    const produtoAdicionado = await knex('produto').where({ ID_PRODUTO: idProdutosAdicionados[0] }).first();
    return produtoAdicionado;
};

exports.atualizarProduto = async (produto) => {
    console.log("produto a atualizar");
    console.log(produto);
    const numeroLinhasAtualizadas = await knex('produto')
        .where({ ID_PRODUTO: produto.ID_PRODUTO })
        .update({
            NOME: produto.NOME,
            PRECO: produto.PRECO,
            DESCRICAO: produto.DESCRICAO,
            'produtor_ID_PRODUTOR': produto['produtor_ID_PRODUTOR']
        });
    if(numeroLinhasAtualizadas){
        const produtoAtualizado = await knex('produto').where({ ID_PRODUTO: produto.ID_PRODUTO }).first();
        console.log("produto atualizado model:");
        console.log(produtoAtualizado);
        return produtoAtualizado;
    }else {
        throw new Error("No product found with the given ID.");
    }
};

exports.listarProdutos = (idProdutor) => {
    return knex('produto').select("*").where({
        produtor_ID_PRODUTOR: idProdutor
    });
};

exports.removerProduto = (idProduto) => {
    console.log("removendo produto no banco: id-produto:" + idProduto);
    return knex('produto').delete().where({
        ID_PRODUTO: idProduto
    });
};