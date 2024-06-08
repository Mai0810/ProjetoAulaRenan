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
