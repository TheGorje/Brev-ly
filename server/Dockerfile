FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable


# Dependências completas
FROM base AS development

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY server/package.json server/package.json
COPY web/package.json web/package.json

RUN pnpm install --frozen-lockfile


# Build backend
FROM development AS builder

COPY server server

RUN pnpm --filter server build


# Migration
FROM development AS migration

COPY server server


# Seed
FROM development AS seed

COPY server server


# Runtime
FROM node:22-alpine AS production

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY server/package.json server/package.json

RUN pnpm install --prod --frozen-lockfile --filter server

COPY --from=builder /app/server/dist ./server/dist

WORKDIR /app/server

EXPOSE 3333

CMD ["node", "dist/server.js"]