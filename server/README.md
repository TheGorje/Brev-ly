# Brev.ly Server

Backend responsável pelo gerenciamento dos links encurtados do Brev.ly.

A aplicação foi desenvolvida utilizando uma arquitetura modular orientada a domínio, separando responsabilidades entre rotas, serviços, repositórios e integrações externas.

O objetivo dessa organização é manter o código escalável, facilitar manutenção e permitir evolução das funcionalidades sem acoplar regras de negócio diretamente às camadas externas.

---

# Tecnologias

- **Node.js** — Runtime da aplicação
- **TypeScript** — Tipagem estática e maior segurança durante o desenvolvimento
- **Fastify** — Framework HTTP focado em performance e baixo overhead
- **PostgreSQL** — Banco de dados relacional utilizado para persistência
- **Drizzle ORM** — Comunicação com banco de dados e gerenciamento de migrations
- **Zod** — Validação de dados e definição de schemas
- **Fastify Swagger** — Geração automática da documentação OpenAPI
- **Scalar API Reference** — Interface para explorar e testar os endpoints
- **Cloudflare R2** — Armazenamento dos arquivos CSV exportados
- **Docker** — Containerização e padronização do ambiente

---

# Funcionalidades

- Criação de links encurtados
- Validação de URLs
- Validação de links encurtados duplicados
- Redirecionamento para URL original
- Contagem de acessos
- Listagem de links
- Paginação utilizando cursor
- Exclusão de links
- Exportação de links em CSV
- Upload dos arquivos exportados utilizando Cloudflare R2
- Documentação automática da API
- Seed para geração de dados de teste

---

# Arquitetura

O backend segue uma organização modular baseada em domínio.

Cada módulo concentra suas próprias regras, mantendo responsabilidades separadas.

```
src
├── modules
│   ├── links
│   ├── exports
│   └── storage
```

Fluxo principal de uma requisição:

```
Request HTTP
      |
      v
Route
      |
      v
Service
      |
      v
Repository
      |
      v
Drizzle ORM
      |
      v
PostgreSQL
```

## Routes

Responsáveis pela camada HTTP:

- definição dos endpoints
- validação dos dados recebidos
- serialização das respostas
- conexão entre HTTP e regras de negócio

## Services

Responsáveis pelas regras da aplicação.

Exemplos:

- criação de links
- validação de existência
- exclusão
- paginação
- exportação

## Repositories

Responsáveis pelo acesso aos dados utilizando Drizzle ORM.

Essa separação mantém a lógica de negócio independente da implementação do banco.

---

# Estrutura do projeto

```
src
├── config
│   ├── cors.ts
│   ├── env.ts
│   ├── error-handler.ts
│   └── openapi.ts
│
├── db
│   ├── index.ts
│   └── schema
│
├── errors
│
├── modules
│   ├── links
│   ├── exports
│   └── storage
│
├── routes
│
├── scripts
│   └── seed-links.ts
│
├── shared
│   └── schemas
│
├── app.ts
└── server.ts
```

---

# Banco de dados

O projeto utiliza PostgreSQL com Drizzle ORM.

Schema principal:

```
links

id
original_url
short_url
access_count
created_at
```

Características:

- UUID como identificador principal
- URL original armazenada em texto
- URL encurtada com índice único
- contador de acessos
- criação automática da data

Schema:

```ts
export const links = pgTable('links', {
  id: uuid('id').defaultRandom().primaryKey(),

  originalUrl: text('original_url').notNull(),

  shortUrl: text('short_url').notNull().unique(),

  accessCount: integer('access_count').notNull().default(0),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

---

# Migrations

As migrations são gerenciadas utilizando Drizzle Kit.

Gerar uma nova migration:

```bash
pnpm db:generate
```

Aplicar migrations localmente:

```bash
pnpm db:migrate
```

Aplicar migrations utilizando Docker:

```bash
docker compose --profile tools run --rm migration
```

Os arquivos de migration devem ser versionados junto ao projeto para garantir que todos os ambientes utilizem a mesma estrutura de banco.

---

# Seed

O projeto possui um script para criação de dados fictícios para testes.

Executar localmente:

```bash
pnpm db:seed
```

Executar utilizando Docker:

```bash
docker compose --profile tools run --rm seed
```

O seed cria **20.000 links** utilizando inserções em batches.

Ele é utilizado para testar:

- paginação por cursor
- consultas no banco
- carregamento da aplicação
- exportação CSV
- comportamento com grande volume de dados

---

# Paginação

A listagem de links utiliza cursor-based pagination.

Essa abordagem foi escolhida ao invés de offset pagination por possuir melhor comportamento em grandes volumes de dados.

Benefícios:

- consultas mais eficientes
- evita inconsistência entre páginas
- melhor escalabilidade conforme a tabela cresce

O cursor utiliza informações do último registro retornado para buscar os próximos itens.

---

# Exportação CSV

A exportação utiliza streaming para evitar carregar todos os registros em memória.

Fluxo:

```
PostgreSQL
      |
      v
CSV Stream
      |
      v
Cloudflare R2
      |
      v
Download
```

A implementação permite exportar grandes volumes de dados com menor consumo de memória.

O armazenamento utiliza uma camada de abstração:

```
storage

   |
   v

r2-storage
```

Isso permite substituir o provedor de armazenamento sem alterar regras de negócio.

---

# Endpoints principais

| Método | Endpoint            | Descrição                     |
| ------ | ------------------- | ----------------------------- |
| POST   | `/links`            | Cria um novo link             |
| GET    | `/links`            | Lista todos os links          |
| GET    | `/links/pagination` | Lista links utilizando cursor |
| DELETE | `/links/:id`        | Remove um link                |
| GET    | `/:shortUrl`        | Redireciona para URL original |
| GET    | `/export`           | Exporta links em CSV          |

A documentação completa está disponível através do Scalar.

---

# Documentação da API

A API possui documentação automática utilizando:

- OpenAPI
- Fastify Swagger
- Scalar API Reference

Após iniciar o servidor:

```
http://localhost:3333/docs
```

é possível visualizar e testar todos os endpoints.

---

# Variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`.

Exemplo:

```env
PORT=3333

DATABASE_URL=postgres://postgres:postgres@localhost:5432/brevly

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

## Docker

Dentro do Docker Compose, o PostgreSQL é acessado pelo nome do serviço:

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/brevly
```

No ambiente local:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/brevly
```

---

# Scripts disponíveis

```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "lint": "eslint src",
  "format": "prettier --write src",
  "db:generate": "drizzle-kit generate --config drizzle.config.ts",
  "db:migrate": "drizzle-kit migrate --config drizzle.config.ts",
  "db:seed": "tsx src/scripts/seed-links.ts"
}
```

---

# Docker

O backend possui uma imagem própria utilizando multi-stage build.

O ambiente Docker contém:

- PostgreSQL
- API Fastify
- Container auxiliar de migrations
- Container auxiliar de seed

Subir o ambiente:

```bash
docker compose up -d
```

Executar migrations:

```bash
docker compose --profile tools run --rm migration
```

Criar dados de teste:

```bash
docker compose --profile tools run --rm seed
```

O backend ficará disponível em:

```
http://localhost:3333
```

---

# Decisões técnicas

## Arquitetura modular

A separação por domínio facilita manutenção e crescimento da aplicação.

## Cursor Pagination

Escolhida para melhorar performance em listas que podem crescer significativamente.

## Streaming CSV

Evita consumo excessivo de memória durante exportações.

## Camada de Storage

Permite substituir o provedor de arquivos sem alterar regras de negócio.

## Validação de ambiente

As variáveis obrigatórias são verificadas antes da inicialização para evitar falhas inesperadas.

## Docker Tools

Migrations e seeds foram separados como ferramentas auxiliares do ambiente, permitindo executar tarefas específicas sem manter containers extras rodando.
