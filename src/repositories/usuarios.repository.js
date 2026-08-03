const Usuario = require('../models/Usuario');

function listar() {
  return Usuario.find().sort({ createdAt: -1 });
}

function buscarPorId(id) {
  return Usuario.findById(id);
}

function buscarPorEmail(email) {
  return Usuario.findOne({ email: email.toLowerCase() });
}

function criar(dados) {
  return Usuario.create(dados);
}

function atualizar(id, dados) {
  return Usuario.findByIdAndUpdate(id, dados, {
    new: true,
    runValidators: true,
  });
}

function excluir(id) {
  return Usuario.findByIdAndDelete(id);
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  excluir,
};
