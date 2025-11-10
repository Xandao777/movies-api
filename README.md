# Movies API

Uma API REST construída com **Node.js**, **Express** e **MongoDB** para realizar operações CRUD sobre uma coleção de filmes. O projeto foi escrito em **TypeScript** e inclui endpoints para criação, listagem, atualização e remoção de registros.

## Sumário
- Visão Geral
- Requisitos
- Configuração do Ambiente
- Scripts Disponíveis
- Estrutura de Pastas
- Rotas da API
- Próximos Passos

## Visão Geral
Este serviço expõe cinco endpoints principais:

- `GET /movies`: retorna todos os filmes armazenados
- `GET /movies/:id`: busca um filme pelo identificador
- `POST /movies`: cadastra um novo filme
- `PUT /movies/:id`: atualiza um filme existente
- `DELETE /movies/:id`: remove um filme

Cada requisição abre uma conexão com o cluster MongoDB, acessa o banco `devweb` e utiliza a coleção `movies`.

## Requisitos
- Node.js >= 18
- npm >= 9
- Instância MongoDB acessível (local ou remota)

## Configuração do Ambiente
1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**

   A aplicação atualmente usa `mongodb://127.0.0.1:27017/` como URI padrão. Para evitar hardcode, crie um arquivo `.env` e exporte `MONGODB_URI` e `PORT` antes de iniciar o servidor (exemplo usando PowerShell):
   ```powershell
   $Env:MONGODB_URI = "mongodb://127.0.0.1:27017/"
   $Env:PORT = 3000
   ```

   > **Sugestão:** atualize `src/index.ts` para ler `process.env.MONGODB_URI` e remover valores fixos.

3. **Compilar o TypeScript**
   ```bash
   npx tsc
   ```

4. **Executar a API**
   ```bash
   node dist/index.js
   ```

   Para desenvolvimento, você pode usar `npx tsc --watch` em um terminal e `node dist/index.js` em outro, ou adicionar scripts no `package.json` como:
   ```json
   "scripts": {
     "dev": "tsc --watch",
     "start": "node dist/index.js",
     "build": "tsc"
   }
   ```

## Scripts Disponíveis
Atualmente apenas o script padrão `npm test` está configurado (retorna um placeholder). Recomenda-se incluir os scripts acima para facilitar o fluxo de trabalho.

## Estrutura de Pastas
```
.
├── dist/           # Saída compilada (gerada pelo TypeScript)
├── node_modules/   # Dependências instaladas
├── src/
│   └── index.ts    # Definição dos endpoints e conexão com o MongoDB
├── index.js        # Entry point JavaScript (pode ser removido/atualizado)
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Rotas da API
### `GET /movies`
Retorna todos os documentos da coleção com `status 200`.

### `GET /movies/:id`
- **Parâmetro**: `id` (ObjectId válido)
- **Responses**:
  - `200`: filme encontrado
  - `404`: filme não encontrado

### `POST /movies`
- **Body**: objeto JSON com os campos do filme (exemplo abaixo)
- **Responses**:
  - `201`: filme criado com sucesso

Exemplo de payload:
```json
{
  "title": "Everything Everywhere All at Once",
  "year": 2022,
  "genres": ["Comedy", "Drama", "Sci-Fi"],
  "rating": 8.1
}
```

### `PUT /movies/:id`
- **Body**: objeto JSON com campos a serem atualizados
- **Responses**:
  - `200`: filme atualizado e retornado no corpo
  - `404`: filme não encontrado

### `DELETE /movies/:id`
- **Responses**:
  - `204`: remoção concluída
  - `404`: filme não encontrado

## Próximos Passos
- Ler variáveis de ambiente para URI do MongoDB e porta do servidor
- Reutilizar uma única instância do `MongoClient` para melhorar performance
- Adicionar validação de entrada (ex.: Joi, Zod) e testes automatizados
- Configurar scripts `dev`, `build` e `start`

---

Se precisar de ajuda para evoluir a API, configurar deploy ou adicionar testes, abra uma issue ou contribua com um pull request!


