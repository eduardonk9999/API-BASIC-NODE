const usuariosService = require('../../services/usuarios.service');

async function substituir(request, response) {
  const usuario = await usuariosService.substituir(request.params.id, request.body);
  return response.json(usuario);
}

module.exports = substituir;
