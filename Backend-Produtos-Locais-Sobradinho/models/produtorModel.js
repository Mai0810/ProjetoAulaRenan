const knex = require('../config/db'); // Importa a configuração de conexão

const produtorModel = {



    async adicionarProdutor(dadosUsuario) {
        //return knex('users').insert(userData);
        try {
        // Iniciar uma transação para garantir a integridade dos dados
        const resultado = await knex.transaction(async trx => {
            // Inserir na tabela de usuários e retornar o ID
            const idsUsuario = await trx('usuario').insert({
            NOME: dadosUsuario.NOME,
            EMAIL: dadosUsuario.EMAIL,
            SENHA: dadosUsuario.SENHA,
            ADMIN: 0
            }).returning('ID_USUARIO');
            
            // Obter o ID do usuário inserido
            const usuarioId = idsUsuario[0];
    
            // Inserir na tabela de produtores com o ID do usuário
            const idProdutor = await trx('produtor').insert({
            DESCRICAO: dadosUsuario.DESCRICAO,
            ENDERECO: dadosUsuario.ENDERECO,
            TELEFONE: dadosUsuario.TELEFONE,
            Usuario_ID_USUARIO: usuarioId
            }).returning('ID_PRODUTOR');
    
            return { msg:"Usuário inscrito com sucesso" };
        });
    
        return resultado;
        } catch (error) {
        console.error('Erro ao criar usuário e produtor:', error);
        throw error;
        }
    },

    async buscarProdutorPorId(userId) {
        try{
            const resultado = await knex.transaction(async trx => {
                const produtor = await trx('produtor')
                    .select('produtor.*', 'usuario.*')
                    .leftJoin('usuario', 'usuario.ID_USUARIO', 'produtor.Usuario_ID_USUARIO')
                    .where('usuario.ID_USUARIO', userId)
                    .first(); // Retorna apenas o primeiro resultado encontrado

                // Verifica se o produtor foi encontrado
                if (!produtor) {
                    throw new Error('Produtor não encontrado para o ID de usuário fornecido');
                }

                return produtor;
            
            });
            return resultado; // Retorna os detalhes do produtor e do usuário associado
        }catch (error) {
            console.error('Erro ao procurar produtor:', error);
            throw error;
        }
    }
}

module.exports = produtorModel;