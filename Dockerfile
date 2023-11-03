# Dockerfile

##### DEPENDENCIES

#EDIT: Use arm64 not amd64
FROM --platform=linux/arm64 node:20.9.0-alpine3.17 AS deps
#EDIT: openssl
RUN apk add --no-cache libc6-compat openssl1.1-compat openssl

WORKDIR /app
#EDIT: gen cert
RUN mkdir certificates
RUN openssl req -x509 -newkey rsa:4096 -keyout certificates/key.pem -out certificates/cert.pem -sha256 -days 36500 -nodes -subj "/C=US/ST=CA/L=SanJose/O=ezfind/OU=ezfind/CN=localhost"

#EDIT: Copy over full prisma folder (migrations, schema)
COPY prisma ./prisma
#EDIT: Copy over dank
# COPY dank-server.js ./

# Copy dependencies
COPY package.json package-lock.json ./

# Clean-install dependencies (avoids cache)
RUN npm ci

##### BUILDER
#EDIT: Use 20.9.0 arm64 not 17 amd64
FROM --platform=linux/arm64 node:20.9.0-alpine3.17 AS builder
#EDIT: delete arg for database_url since it's unused
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
#EDIT: Copy over full prisma folder (migrations, schema)
COPY --from=deps /app/prisma ./prisma
#EDIT: Copy over cert
COPY --from=deps /app/certificates ./certificates
#EDIT: Copy over dank
# COPY --from=deps /app/dank-server.js ./
#I actual don't know why this was included in original image lmfao
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN SKIP_ENV_VALIDATION=1 npm run build

##### RUNNER
#EDIT: Use arm64 not amd64
FROM --platform=linux/arm64 node:20.9.0-alpine3.17 AS runner
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
#EDIT: Copy over full prisma folder (migrations, schema)
COPY --from=builder /app/prisma ./prisma
#EDIT: Copy over cert
COPY --from=builder /app/certificates ./certificates
#EDIT: Copy over dank
# COPY --from=builder /app/dank-server.js ./

USER nextjs
EXPOSE 3000
ENV PORT 3000

#EDIT: Map schema.prisma to the postgres schema, then run server.
# node server.js (regular, http)
# node dank-server.js (advanced, https, WIP)
CMD npx prisma migrate deploy \
&& node server.js
# && NODE_ENV=production node dank-server.js