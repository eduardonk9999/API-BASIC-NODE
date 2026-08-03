const usuariosService = require('../../services/usuarios.service');

function buscarPorId(request, response) {
  return response.json(usuariosService.buscarPorId(request.params.id));
}

module.exports = buscarPorId;
