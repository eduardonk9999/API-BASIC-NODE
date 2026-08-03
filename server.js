require('dotenv').config();

const app = require('./src/app');
const conectarBanco = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await conectarBanco();

    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Erro ao iniciar o servidor:', error.message);
    });
  } catch (error) {
    console.error('Não foi possível iniciar a aplicação:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
