const usuariosService = require('../../services/usuarios.service');

function criar(request, response) {
  const usuario = usuariosService.criar(request.body);
  return response.status(201).json(usuario);
}

module.exports = criar;
