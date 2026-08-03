let proximoId = 1;
const usuarios = [];

function listar() {
  return usuarios;
}

function buscarPorId(id) {
  return usuarios.find((usuario) => usuario.id === id);
}

function buscarPorEmail(email) {
  return usuarios.find((usuario) => usuario.email === email);
}

function criar(dados) {
  const usuario = { id: proximoId++, ...dados };
  usuarios.push(usuario);
  return usuario;
}

function atualizar(id, dados) {
  const indice = usuarios.findIndex((usuario) => usuario.id === id);

  if (indice === -1) {
    return null;
  }

  usuarios[indice] = { ...usuarios[indice], ...dados, id };
  return usuarios[indice];
}

function excluir(id) {
  const indice = usuarios.findIndex((usuario) => usuario.id === id);

  if (indice === -1) {
    return false;
  }

  usuarios.splice(indice, 1);
  return true;
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  excluir,
};
