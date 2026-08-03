const prisma = require('./prisma');

async function conectarBanco() {
  if (!process.env.DATABASE_URL) {
    throw new Error('A variável DATABASE_URL não foi definida.');
  }

  await prisma.$connect();
  console.log('MongoDB conectado pelo Prisma.');
}

module.exports = conectarBanco;
