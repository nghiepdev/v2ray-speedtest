# Stage 0
FROM node:20-alpine as base

LABEL maintainer="Nghiep <me@nghiep.dev>"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml ./


# Stage 1
FROM base as deps
RUN  --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# Stage 2
FROM base AS runner
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 4000

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN rm -rf bin/speedtest-darwin

EXPOSE $PORT

CMD ["./node_modules/.bin/tsx", "src"]