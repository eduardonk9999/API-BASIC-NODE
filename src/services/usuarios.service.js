const AppError = require('../errors/AppError');
const usuariosRepository = require('../repositories/usuarios.repository');

const objectIdPattern = /^[a-f\d]{24}$/i;

function listar() {
  return usuariosRepository.listar();
}

async function buscarPorId(id) {
  if (!objectIdPattern.test(id)) {
    throw new AppError('ID de usuário inválido.');
  }

  const usuario = await usuariosRepository.buscarPorId(id);

  if (!usuario) {
    throw new AppError('Usuário não encontrado.', 404);
  }

  return usuario;
}

function validarDadosObrigatorios({ nome, email }) {
  if (typeof nome !== 'string' || !nome.trim() || typeof email !== 'string' || !email.trim()) {
    throw new AppError('Nome e e-mail são obrigatórios.');
  }
}

function validarCampoOpcional(valor, campo) {
  if (valor !== undefined && (typeof valor !== 'string' || !valor.trim())) {
    throw new AppError(`O campo ${campo} deve ser um texto válido.`);
  }
}

async function validarEmailDisponivel(email, usuarioId) {
  const usuario = await usuariosRepository.buscarPorEmail(email.trim());

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
  return usuariosRepository.atualizar(usuario.id, {
    nome: dados.nome,
    email: dados.email,
  });
}

async function atualizar(id, dados) {
  const usuario = await buscarPorId(id);
  const dadosPermitidos = {};

  validarCampoOpcional(dados.nome, 'nome');
  validarCampoOpcional(dados.email, 'email');

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
