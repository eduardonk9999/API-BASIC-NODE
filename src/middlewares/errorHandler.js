function errorHandler(error, request, response, next) {
  if (error.code === 11000) {
    return response.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message });
  }

  if (error.statusCode) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: 'Erro interno do servidor.' });
}

module.exports = errorHandler;
