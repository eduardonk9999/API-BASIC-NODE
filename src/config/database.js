const mongoose = require('mongoose');

async function conectarBanco() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('A variável MONGODB_URI não foi definida.');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB conectado.');
}

module.exports = conectarBanco;
