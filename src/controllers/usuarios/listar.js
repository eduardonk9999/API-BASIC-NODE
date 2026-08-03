const usuariosService = require('../../services/usuarios.service');

function listar(request, response) {
  return response.json(usuariosService.listar());
}

module.exports = listar;
