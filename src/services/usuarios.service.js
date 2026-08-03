const AppError = require('../errors/AppError');
const usuariosRepository = require('../repositories/usuarios.repository');

function listar() {
  return usuariosRepository.listar();
}

function buscarPorId(id) {
  const usuario = usuariosRepository.buscarPorId(Number(id));

  if (!usuario) {
    throw new AppError('Usuário não encontrado.', 404);
  }

  return usuario;
}

function validarDadosObrigatorios({ nome, email }) {
  if (!nome || !email) {
    throw new AppError('Nome e e-mail são obrigatórios.');
  }
}

function validarEmailDisponivel(email, usuarioId) {
  const usuario = usuariosRepository.buscarPorEmail(email);

  if (usuario && usuario.id !== usuarioId) {
    throw new AppError('E-mail já cadastrado.', 409);
  }
}

function criar(dados) {
  validarDadosObrigatorios(dados);
  validarEmailDisponivel(dados.email);
  return usuariosRepository.criar(dados);
}

function substituir(id, dados) {
  const usuario = buscarPorId(id);
  validarDadosObrigatorios(dados);
  validarEmailDisponivel(dados.email, usuario.id);
  return usuariosRepository.atualizar(usuario.id, dados);
}

function atualizar(id, dados) {
  const usuario = buscarPorId(id);
  const dadosPermitidos = {};

  if (dados.nome !== undefined) dadosPermitidos.nome = dados.nome;
  if (dados.email !== undefined) dadosPermitidos.email = dados.email;

  if (Object.keys(dadosPermitidos).length === 0) {
    throw new AppError('Informe nome ou e-mail para atualizar.');
  }

  if (dadosPermitidos.email !== undefined) {
    validarEmailDisponivel(dadosPermitidos.email, usuario.id);
  }

  return usuariosRepository.atualizar(usuario.id, dadosPermitidos);
}

function excluir(id) {
  const usuario = buscarPorId(id);
  usuariosRepository.excluir(usuario.id);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  substituir,
  atualizar,
  excluir,
};
