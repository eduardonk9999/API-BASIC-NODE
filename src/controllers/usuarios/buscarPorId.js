const usuariosService = require('../../services/usuarios.service');

async function buscarPorId(request, response) {
  const usuario = await usuariosService.buscarPorId(request.params.id);
  return response.json(usuario);
}

module.exports = buscarPorId;
