function errorHandler(error, request, response, next) {
  if (error.code === 'P2002') {
    return response.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  if (error.code === 'P2023') {
    return response.status(400).json({ message: 'ID de usuário inválido.' });
  }

  if (error.statusCode) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: 'Erro interno do servidor.' });
}

module.exports = errorHandler;
