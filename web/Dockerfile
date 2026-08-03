FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY web/package.json web/package.json

RUN pnpm install --frozen-lockfile

COPY web web

RUN pnpm --filter web build


FROM nginx:alpine

COPY --from=builder /app/web/dist /usr/share/nginx/html

COPY web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]