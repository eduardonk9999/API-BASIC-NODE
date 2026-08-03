function errorHandler(error, request, response, next) {
  if (error.statusCode) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return response.status(500).json({ message: 'Erro interno do servidor.' });
}

module.exports = errorHandler;
