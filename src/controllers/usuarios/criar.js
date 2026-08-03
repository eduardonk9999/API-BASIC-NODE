const usuariosService = require('../../services/usuarios.service');

async function criar(request, response) {
  const usuario = await usuariosService.criar(request.body);
  return response.status(201).json(usuario);
}

module.exports = criar;
