FROM node:20-alpine

LABEL maintainer="Nghiep <me@nghiep.dev>"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8 --activate

EXPOSE 3000

WORKDIR /app

COPY . .

RUN pnpm install

CMD ["./node_modules/.bin/tsx", "src"]