const ProdutorModel = require('../models/produtorModel');
const UsuarioModel = require('../models/usuarioModel');
const UsuarioService = require('./usuarioService');


exports.adicionarProdutor = ({ NOME, EMAIL, SENHA, DESCRICAO, ENDERECO, TELEFONE, ID_PRODUTOR }) => {
    return ProdutorModel.adicionarProdutor({NOME, EMAIL, SENHA, DESCRICAO, ENDERECO, TELEFONE, ID_PRODUTOR});
}

exports.buscarProdutor = (id) => {
    return ProdutorModel.buscarProdutorPorId(id);
}

exports.atualizarProdutor = async (idUsuario, dadosUsuarioProdutor) => {
    const { NOME, EMAIL, SENHA } = dadosUsuarioProdutor;
        // Atualizar detalhes do usuário
    const resultadoUsuario = await UsuarioModel.atualizarDetalhesDoUsuario(idUsuario, { NOME, EMAIL, SENHA });
    if (!resultadoUsuario.sucesso) {
        throw new Exception({msg:resultadoUsuario});
    }

    const { DESCRICAO, TELEFONE, ENDERECO } = dadosUsuarioProdutor;
       // Atualizar detalhes do produtor
    const resultadoProdutor = await ProdutorModel.atualizarDetalhesDoProdutor(idUsuario, { DESCRICAO, TELEFONE, ENDERECO });
    if (!resultadoProdutor.sucesso) {
        throw new Exception({msg:resultadoProdutor});
    }

    const status = {
        sucesso: true,
        mensagem: 'Detalhes do usuário e produtor atualizados com sucesso'
    };
    return status;
}


exports.removerProdutor = async (idProdutor) => {
    let idUsuario = await ProdutorModel.buscarIdUsuarioPorIdProdutor(idProdutor);
    if(idUsuario){
        const res = await ProdutorModel.removerProdutor(idProdutor);
        console.log("id usuario a remover:" + idUsuario);
        const a = await UsuarioService.deletarUsuario(idUsuario);
        return res;
    }else {
        throw new Error("Usuario não encontrado para remover");
    }
};