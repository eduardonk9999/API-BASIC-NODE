const prisma = require('../config/prisma');

function listar() {
  return prisma.usuario.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

function buscarPorId(id) {
  return prisma.usuario.findUnique({
    where: { id },
  });
}

function buscarPorEmail(email) {
  return prisma.usuario.findUnique({
    where: { email: email.toLowerCase() },
  });
}

function criar(dados) {
  return prisma.usuario.create({
    data: {
      nome: dados.nome.trim(),
      email: dados.email.toLowerCase().trim(),
    },
  });
}

function atualizar(id, dados) {
  const dadosNormalizados = { ...dados };

  if (dadosNormalizados.nome !== undefined) {
    dadosNormalizados.nome = dadosNormalizados.nome.trim();
  }

  if (dadosNormalizados.email !== undefined) {
    dadosNormalizados.email = dadosNormalizados.email.toLowerCase().trim();
  }

  return prisma.usuario.update({
    where: { id },
    data: dadosNormalizados,
  });
}

function excluir(id) {
  return prisma.usuario.delete({
    where: { id },
  });
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  excluir,
};
