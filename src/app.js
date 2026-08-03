const express = require('express');
const usuariosRoutes = require('./routes/usuarios.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'API de cadastro de usuários funcionando!' });
});

app.use('/usuarios', usuariosRoutes);
app.use(errorHandler);

module.exports = app;
