const usuariosService = require('../../services/usuarios.service');

function atualizar(request, response) {
  const usuario = usuariosService.atualizar(request.params.id, request.body);
  return response.json(usuario);
}

module.exports = atualizar;
