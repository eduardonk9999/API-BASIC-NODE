const mongoose = require('mongoose');
const AppError = require('../errors/AppError');
const usuariosRepository = require('../repositories/usuarios.repository');

function listar() {
  return usuariosRepository.listar();
}

async function buscarPorId(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError('ID de usuário inválido.');
  }

  const usuario = await usuariosRepository.buscarPorId(id);

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

async function validarEmailDisponivel(email, usuarioId) {
  const usuario = await usuariosRepository.buscarPorEmail(email);

  if (usuario && usuario.id !== usuarioId) {
    throw new AppError('E-mail já cadastrado.', 409);
  }
}

async function criar(dados) {
  validarDadosObrigatorios(dados);
  await validarEmailDisponivel(dados.email);
  return usuariosRepository.criar(dados);
}

async function substituir(id, dados) {
  const usuario = await buscarPorId(id);
  validarDadosObrigatorios(dados);
  await validarEmailDisponivel(dados.email, usuario.id);
  return usuariosRepository.atualizar(usuario.id, dados);
}

async function atualizar(id, dados) {
  const usuario = await buscarPorId(id);
  const dadosPermitidos = {};

  if (dados.nome !== undefined) dadosPermitidos.nome = dados.nome;
  if (dados.email !== undefined) dadosPermitidos.email = dados.email;

  if (Object.keys(dadosPermitidos).length === 0) {
    throw new AppError('Informe nome ou e-mail para atualizar.');
  }

  if (dadosPermitidos.email !== undefined) {
    await validarEmailDisponivel(dadosPermitidos.email, usuario.id);
  }

  return usuariosRepository.atualizar(usuario.id, dadosPermitidos);
}

async function excluir(id) {
  const usuario = await buscarPorId(id);
  await usuariosRepository.excluir(usuario.id);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  substituir,
  atualizar,
  excluir,
};
