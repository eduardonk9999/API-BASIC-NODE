const usuariosService = require('../../services/usuarios.service');

function excluir(request, response) {
  usuariosService.excluir(request.params.id);
  return response.status(204).send();
}

module.exports = excluir;
