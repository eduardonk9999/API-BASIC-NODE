# API Basic Node

API REST para cadastro de usuários, desenvolvida com Node.js e Express. O projeto demonstra um CRUD completo com uma estrutura modular e separação entre rotas, controllers, regras de negócio e acesso aos dados.

## Tecnologias

- Node.js
- Express 5
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

Inicie o servidor:

```bash
node server.js
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
  "id": 1,
  "nome": "Eduardo",
  "email": "eduardo@example.com"
}
```

### Atualizar parcialmente um usuário

```bash
curl --request PATCH http://localhost:3000/usuarios/1 \
  --header "Content-Type: application/json" \
  --data '{"nome":"Eduardo Silva"}'
```

### Excluir um usuário

```bash
curl --request DELETE http://localhost:3000/usuarios/1
```

## Estrutura do projeto

```text
.
├── server.js
└── src
    ├── app.js
    ├── controllers
    │   └── usuarios
    ├── errors
    ├── middlewares
    ├── repositories
    ├── routes
    └── services
```

- `server.js`: inicia o servidor HTTP.
- `app.js`: configura o Express e seus middlewares.
- `controllers`: converte requisições HTTP em chamadas para a aplicação.
- `services`: concentra validações e regras de negócio.
- `repositories`: gerencia o acesso e a persistência dos dados.
- `routes`: relaciona endpoints aos controllers.
- `middlewares`: trata erros da aplicação.
- `errors`: contém os tipos de erro personalizados.

## Armazenamento

Os usuários são armazenados em memória. Os dados são apagados sempre que o servidor é reiniciado. Em uma aplicação de produção, o repository pode ser substituído por uma integração com banco de dados sem alterar as rotas da API.

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
