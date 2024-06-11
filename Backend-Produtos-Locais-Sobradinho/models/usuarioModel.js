const knex = require('../config/db'); // Importa a configuração de conexão

const usuarioModel = {
    async login(email, senha) {
      try {
        const usuarios = await knex('usuario')
          .select('*')
          .where('EMAIL', email.toString())
          .andWhere('SENHA', senha.toString()).first();
        return usuarios;
      } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
      }
    },

    async atualizarDetalhesDoUsuario(idUsuario, dadosUsuario) {
      try {
          const { NOME, EMAIL, SENHA } = dadosUsuario;
          await knex('usuario')
              .where({ ID_USUARIO: idUsuario })
              .update({ NOME, EMAIL, SENHA});
          return { sucesso: true, mensagem: 'Usuário atualizado com sucesso' };
      } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          return { sucesso: false, mensagem: 'Erro ao atualizar usuário' };
      }
    },

    async deleteUsuario(id) {
      console.log("remover usuário com id: " + id);
      return knex('usuario').delete().where({ ID_USUARIO: id });
    }


    // findUserByEmail(email) {
    //   return knex('users').where({ email }).first();
    // },
  
    
  
    // updateUser(id, userData) {
    //   return knex('users').where({ id }).update(userData);
    // },
  
    // deleteUser(id) {
    //   return knex('users').where({ id }).del();
    // }
  }
  
module.exports = usuarioModel;
