const usuariosService = require('../../services/usuarios.service');

function substituir(request, response) {
  const usuario = usuariosService.substituir(request.params.id, request.body);
  return response.json(usuario);
}

module.exports = substituir;
