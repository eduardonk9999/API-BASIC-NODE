const usuariosService = require('../../services/usuarios.service');

async function atualizar(request, response) {
  const usuario = await usuariosService.atualizar(request.params.id, request.body);
  return response.json(usuario);
}

module.exports = atualizar;
