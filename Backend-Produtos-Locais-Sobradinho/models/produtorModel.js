const knex = require('../config/db'); // Importa a configuração de conexão

const TABELA_PRODUTOR = "produtor";

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

    // ESTE ID É O ID DO USUÁRIO
    async buscarProdutorPorId(userId) {
        try{
            const resultado = await knex.transaction(async trx => {
                const produtor = await trx(TABELA_PRODUTOR)
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
    },
    
    // Função para atualizar detalhes do produtor
    async atualizarDetalhesDoProdutor(idUsuario, dadosProdutor) {
        try {
            const { DESCRICAO, TELEFONE, ENDERECO } = dadosProdutor;
            await knex(TABELA_PRODUTOR)
                .where({ Usuario_ID_USUARIO: idUsuario }) 
                .update({ DESCRICAO, TELEFONE, ENDERECO });
            return { sucesso: true, mensagem: 'Detalhes do produtor atualizados com sucesso' };
        } catch (error) {
            console.error('Erro ao atualizar produtor:', error);
            return { sucesso: false, mensagem: 'Erro ao atualizar produtor' };
        }
    },


    async buscarIdUsuarioPorIdProdutor(idProdutor) {
        console.log("buscar id usuario pelo id produtor>" + idProdutor)
        try {
            const resultado = await knex(TABELA_PRODUTOR)
              .select('Usuario_ID_USUARIO')
              .where('ID_PRODUTOR', idProdutor)
              .first();
        
            // Se resultado é um array e queremos garantir que pegamos apenas um resultado
            if (resultado) {
              return resultado.Usuario_ID_USUARIO; // Retorna o primeiro (e, presumivelmente, único) `Usuario_ID_USUARIO`
            } else {
              return null; // Retorna null se nenhum produtor foi encontrado
            }
          } catch (error) {
            console.error('Erro ao buscar Usuario_ID_USUARIO:', error);
            throw error; // Lançar o erro para cima permite que o chamador lide com ele
          }
    },

    async removerProdutor(idProdutor) {
        try {
            console.log("removendo produtor no banco: id-produtor:" + idProdutor);
            await knex(TABELA_PRODUTOR).delete().where({
                ID_PRODUTOR: idProdutor
            });
            return { sucesso: true, mensagem: 'Produtor excluído com sucesso' };
        } catch (error) {
            console.error('Erro ao excluir produtor:', error);
            return { sucesso: false, mensagem: 'Erro ao excluir produtor' };
        }
    },

    // buscar produtores
    async buscarProdutoresHome() {
        try {
            const produtores = await knex(TABELA_PRODUTOR).select('NOME', 'ID_PRODUTOR', 'Usuario_ID_USUARIO', 'ENDERECO', 'TELEFONE')
            .leftJoin('usuario', 'usuario.ID_USUARIO', 'produtor.Usuario_ID_USUARIO')
            .where({ADMIN: 0})
            console.log("Buscando produtores no banco +" + produtores);
            return { sucesso: true, dados: produtores, mensagem: 'Produtores encontrados com sucesso' };
        } catch (erro) {
            console.error('Erro ao buscar produtores:', erro);
            return { sucesso: false, mensagem: 'Erro ao buscar produtores' };
        }
    }

}

module.exports = produtorModel;
