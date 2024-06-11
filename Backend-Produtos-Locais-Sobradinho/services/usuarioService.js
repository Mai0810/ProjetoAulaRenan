const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioModel = require('../models/usuarioModel');

const EMAIL_ADMIN = "maizers08@gmail.com";
const SENHA_ADMIN = "soulindademais";

exports.autenticarUsuario = ({ email, senha }) => {
  return new Promise(async (resolve, reject) => {
    const usuario = await UsuarioModel.login(email, senha);
    console.log("retorno autenticar usuário");
    console.log(usuario);
    if(usuario){
        resolve(usuario);
    }else {
        console.log("0 usuário encontrados");
        reject({status:404, message: {error: true, msg:"Login e/ou senha inválidos"}});
    }

    
  });
};

exports.deletarUsuario = async (idUsuario) => {
  return UsuarioModel.deleteUsuario(idUsuario);
}

