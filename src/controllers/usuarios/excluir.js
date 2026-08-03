const usuariosService = require('../../services/usuarios.service');

async function excluir(request, response) {
  await usuariosService.excluir(request.params.id);
  return response.status(204).send();
}

module.exports = excluir;
