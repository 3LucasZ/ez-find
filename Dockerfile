# Dockerfile

##### DEPENDENCIES

#EDIT: Use arm64 not amd64
FROM --platform=linux/arm64 node:16-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Install Prisma Client - remove if not using Prisma
COPY prisma ./prisma

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./

RUN npm ci

##### BUILDER
#EDIT: Use arm64 not amd64
FROM --platform=linux/arm64 node:16-alpine3.17 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN SKIP_ENV_VALIDATION=1 npm run build

##### RUNNER
#EDIT: Use arm64 not amd64
FROM --platform=linux/arm64 node:16-alpine3.17 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#EDIT: Use next.config.js not next.config.mjs
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD npx prisma migrate deploy && node server.js