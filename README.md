# API Basic Node

API REST para cadastro de usuários, desenvolvida com Node.js, Express, MongoDB e Prisma ORM. O projeto demonstra um CRUD completo com uma estrutura modular e separação entre rotas, controllers, regras de negócio e acesso aos dados.

## Tecnologias

- Node.js
- Express 5
- MongoDB
- Prisma ORM 6.19
- JavaScript (CommonJS)

## Funcionalidades

- Cadastrar usuários
- Listar todos os usuários
- Buscar um usuário por ID
- Substituir todos os dados de um usuário
- Atualizar parcialmente um usuário
- Excluir usuários
- Validar campos obrigatórios e e-mails duplicados
- Tratar erros de forma centralizada

## Como executar

Clone o repositório e acesse a pasta do projeto:

```bash
git clone git@github.com:eduardonk9999/API-BASIC-NODE.git
cd API-BASIC-NODE
```

Instale as dependências:

```bash
npm install
```

Para iniciar um MongoDB local com Docker:

```bash
docker compose up -d
docker compose exec mongodb mongosh --eval "rs.initiate()"
```

Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

Configure a conexão no `.env`:

```env
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/api-basic-node
```

Ao usar o MongoDB do `compose.yaml`, utilize a configuração de replica set:

```env
DATABASE_URL=mongodb://127.0.0.1:27017/api-basic-node?replicaSet=rs0&directConnection=true
```

O endereço também pode ser substituído pela URI de um cluster do MongoDB Atlas.

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Para sincronizar o schema com o banco:

```bash
npm run prisma:push
```

Inicie o servidor:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

Também é possível definir outra porta pela variável de ambiente:

```bash
PORT=4000 node server.js
```

## Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/` | Verifica se a API está funcionando |
| `GET` | `/usuarios` | Lista todos os usuários |
| `GET` | `/usuarios/:id` | Busca um usuário pelo ID |
| `POST` | `/usuarios` | Cadastra um usuário |
| `PUT` | `/usuarios/:id` | Substitui os dados do usuário |
| `PATCH` | `/usuarios/:id` | Atualiza parte dos dados do usuário |
| `DELETE` | `/usuarios/:id` | Exclui um usuário |

## Exemplos

### Cadastrar um usuário

```bash
curl --request POST http://localhost:3000/usuarios \
  --header "Content-Type: application/json" \
  --data '{"nome":"Eduardo","email":"eduardo@example.com"}'
```

Resposta esperada:

```json
{
  "id": "66b03d8f0fc13a1b2c3d4e5f",
  "nome": "Eduardo",
  "email": "eduardo@example.com",
  "createdAt": "2026-08-03T16:00:00.000Z",
  "updatedAt": "2026-08-03T16:00:00.000Z"
}
```

### Atualizar parcialmente um usuário

```bash
curl --request PATCH http://localhost:3000/usuarios/66b03d8f0fc13a1b2c3d4e5f \
  --header "Content-Type: application/json" \
  --data '{"nome":"Eduardo Silva"}'
```

### Excluir um usuário

```bash
curl --request DELETE http://localhost:3000/usuarios/66b03d8f0fc13a1b2c3d4e5f
```

## Testes com Postman

A collection em `postman/API-BASIC-NODE.postman_collection.json` cobre o fluxo completo do CRUD. Ela cria um usuário temporário, reutiliza o ID retornado nas operações seguintes e exclui o registro ao final.

Importe o arquivo no Postman Desktop ou execute pelo Newman:

```bash
npx --yes newman run postman/API-BASIC-NODE.postman_collection.json
```

A collection valida automaticamente os status `201`, `200`, `204` e `404`.

## Estrutura do projeto

```text
.
├── compose.yaml
├── postman
│   └── API-BASIC-NODE.postman_collection.json
├── prisma
│   └── schema.prisma
├── server.js
└── src
    ├── app.js
    ├── config
    ├── controllers
    │   └── usuarios
    ├── errors
    ├── middlewares
    ├── repositories
    ├── routes
    └── services
```

- `server.js`: inicia o servidor HTTP.
- `compose.yaml`: executa o MongoDB local com replica set.
- `postman`: contém a collection e os testes do CRUD.
- `prisma/schema.prisma`: define a conexão e o model de usuário.
- `config`: centraliza o Prisma Client e a conexão com o banco.
- `app.js`: configura o Express e seus middlewares.
- `controllers`: converte requisições HTTP em chamadas para a aplicação.
- `services`: concentra validações e regras de negócio.
- `repositories`: gerencia o acesso e a persistência dos dados.
- `routes`: relaciona endpoints aos controllers.
- `middlewares`: trata erros da aplicação.
- `errors`: contém os tipos de erro personalizados.

## Armazenamento

Os usuários são persistidos no MongoDB por meio do Prisma ORM. O campo `_id` é gerado pelo banco, e os campos `createdAt` e `updatedAt` são preenchidos automaticamente.

O MongoDB não utiliza Prisma Migrate. Alterações no schema são aplicadas com `npm run prisma:push`.

## Formato dos dados

As requisições de criação e atualização utilizam JSON no corpo e devem enviar o header:

```http
Content-Type: application/json
```

Campos do usuário:

| Campo | Tipo | Obrigatório |
| --- | --- | --- |
| `nome` | string | Sim no `POST` e no `PUT` |
| `email` | string | Sim no `POST` e no `PUT` |

## Autor

[Eduardo — @eduardonk9999](https://github.com/eduardonk9999)
