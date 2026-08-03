const usuariosRepository = require('../repositories/usuarios.repository');

function listar(request, response) {
  return response.json(usuariosRepository.listar());
}

function buscarPorId(request, response) {
  const usuario = usuariosRepository.buscarPorId(Number(request.params.id));

  if (!usuario) {
    return response.status(404).json({ message: 'Usuário não encontrado.' });
  }

  return response.json(usuario);
}

function criar(request, response) {
  const { nome, email } = request.body;

  if (!nome || !email) {
    return response.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
  }

  if (usuariosRepository.buscarPorEmail(email)) {
    return response.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  const usuario = usuariosRepository.criar({ nome, email });
  return response.status(201).json(usuario);
}

function substituir(request, response) {
  const id = Number(request.params.id);
  const { nome, email } = request.body;
  const usuario = usuariosRepository.buscarPorId(id);

  if (!usuario) {
    return response.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (!nome || !email) {
    return response.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
  }

  const usuarioComEmail = usuariosRepository.buscarPorEmail(email);

  if (usuarioComEmail && usuarioComEmail.id !== id) {
    return response.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  return response.json(usuariosRepository.atualizar(id, { nome, email }));
}

function atualizar(request, response) {
  const id = Number(request.params.id);
  const { nome, email } = request.body;
  const usuario = usuariosRepository.buscarPorId(id);

  if (!usuario) {
    return response.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (nome === undefined && email === undefined) {
    return response.status(400).json({ message: 'Informe nome ou e-mail para atualizar.' });
  }

  const usuarioComEmail = email && usuariosRepository.buscarPorEmail(email);

  if (usuarioComEmail && usuarioComEmail.id !== id) {
    return response.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  const dados = {};

  if (nome !== undefined) dados.nome = nome;
  if (email !== undefined) dados.email = email;

  return response.json(usuariosRepository.atualizar(id, dados));
}

function excluir(request, response) {
  const excluido = usuariosRepository.excluir(Number(request.params.id));

  if (!excluido) {
    return response.status(404).json({ message: 'Usuário não encontrado.' });
  }

  return response.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  substituir,
  atualizar,
  excluir,
};
