# Brev.ly Web

Frontend da aplicação **Brev.ly**, um encurtador de URLs desenvolvido com React, TypeScript e Vite.

A aplicação permite criar, gerenciar e acessar links encurtados, com foco em uma experiência simples, responsiva e com tratamento completo de estados assíncronos.

## Tecnologias

- **React 19** — Construção da interface
- **TypeScript** — Tipagem estática
- **Vite** — Build e ambiente de desenvolvimento
- **Tailwind CSS 4** — Estilização
- **React Router** — Gerenciamento de rotas
- **TanStack Query** — Gerenciamento de estado assíncrono e cache
- **React Hook Form** — Gerenciamento de formulários
- **Zod** — Validação e tipagem dos dados
- **Axios** — Cliente HTTP
- **Phosphor Icons** — Biblioteca de ícones
- **Sonner** — Notificações toast

---

## Funcionalidades

### Gerenciamento de links

- Criar novos links encurtados
- Validar dados antes do envio
- Exibir erros retornados pela API
- Tratar conflitos de links duplicados (`409 Conflict`)
- Listar links existentes
- Copiar links para área de transferência
- Excluir links com confirmação
- Exportar links em CSV

### Experiência do usuário

- Interface responsiva (mobile-first)
- Estados de carregamento
- Skeleton loading para listas
- Loading nos botões durante requisições
- Dialog de confirmação para ações destrutivas
- Estados vazios para listas sem dados
- Tratamento de erros inesperados

### Paginação

A listagem utiliza **infinite scroll** baseado em cursor.

O frontend consome a paginação fornecida pelo backend, carregando novos registros conforme o usuário navega pela lista.

---

# Arquitetura

O projeto utiliza uma organização baseada em funcionalidades (**feature-based architecture**).

A estrutura principal:

```
src
├── app
├── components
├── features
├── hooks
├── libs
├── pages
├── services
├── styles
├── types
└── utils
```

## App

Responsável pela configuração global da aplicação:

- Providers
- Router
- React Query Client
- Configurações iniciais

---

## Components

Componentes reutilizáveis da interface:

```
components/ui
```

Exemplos:

- Button
- ButtonIcon
- TextField
- Dialog
- Typography
- LoadingSpinner

Esses componentes não possuem regra de negócio, sendo utilizados por diferentes funcionalidades.

---

## Features

Cada funcionalidade possui sua própria estrutura:

```
features
├── create-link
├── my-links
└── redirect
```

Cada feature contém:

- Componentes específicos
- Hooks
- Comunicação com API
- Schemas de validação
- Tipagens

Exemplo:

```
create-link
├── api
├── components
├── hooks
├── schemas
└── types
```

Essa organização mantém o código isolado e facilita manutenção e evolução.

---

# Configuração de ambiente

Crie um arquivo `.env` dentro da pasta `web`:

```env
VITE_BACKEND_URL=http://localhost:3333

# Simula atrasos na API para validar estados de loading
VITE_API_DELAY_MS=2500
```

## VITE_BACKEND_URL

Define a URL base utilizada pelo Axios.

Em desenvolvimento local:

```
http://localhost:3333
```

Em Docker:

```
/api
```

No ambiente Docker, o frontend utiliza Nginx como proxy reverso para encaminhar as requisições ao backend.

---

## VITE_API_DELAY_MS

Variável utilizada para simular lentidão da API.

Ela permite testar:

- Skeleton loading
- Loading dos botões
- Estados de espera
- Feedback visual ao usuário

Exemplo:

```env
VITE_API_DELAY_MS=2500
```

Simula aproximadamente 2,5 segundos de atraso nas chamadas HTTP.

---

# Comunicação com API

O cliente HTTP é configurado utilizando Axios:

```ts
axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
```

Em desenvolvimento:

```
Frontend
localhost:5173
      |
      |
Backend
localhost:3333
```

Em Docker:

```
Frontend
localhost:3000
      |
      |
Nginx
      |
      |
Backend
server:3333
```

---

# Docker

O frontend possui uma imagem própria utilizando multi-stage build.

## Etapas

### Build

Utiliza Node.js para:

- instalar dependências
- gerar o build de produção

### Produção

Utiliza Nginx para servir os arquivos estáticos.

Fluxo:

```
Node.js
   |
   v
Vite build
   |
   v
Nginx
   |
   v
Aplicação React
```

---

## Nginx

O Nginx possui duas responsabilidades:

### Servir aplicação React

Todas as rotas são direcionadas para:

```
index.html
```

permitindo funcionamento do React Router.

### Proxy da API

Chamadas:

```
/api/*
```

são encaminhadas para:

```
server:3333
```

Exemplo:

```
GET /api/links

        ↓

GET server:3333/links
```

---

# Scripts disponíveis

Executar dentro da pasta `web`:

```bash
pnpm dev
```

Inicia o ambiente de desenvolvimento.

---

```bash
pnpm build
```

Gera o build de produção.

---

```bash
pnpm preview
```

Executa uma prévia do build gerado.

---

```bash
pnpm lint
```

Executa análise de código.

---

```bash
pnpm format
```

Formata os arquivos utilizando Prettier.

---

# Desenvolvimento

O frontend foi desenvolvido priorizando:

- Componentização
- Separação de responsabilidades
- Reutilização de componentes
- Tipagem forte
- Feedback visual para todas as ações assíncronas
- Organização escalável por funcionalidades
