const express = require('express');
const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'API de cadastro de usuários funcionando!' });
});

app.use('/usuarios', usuariosRoutes);

module.exports = app;
