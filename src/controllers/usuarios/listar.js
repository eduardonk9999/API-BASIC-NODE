const usuariosService = require('../../services/usuarios.service');

async function listar(request, response) {
  const usuarios = await usuariosService.listar();
  return response.json(usuarios);
}

module.exports = listar;
