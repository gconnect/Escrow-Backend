FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
COPY . .
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET
RUN npm run build 


# # Stage 2: Run
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/prisma ./prisma


ENV JWT_SECRET=""

EXPOSE 3000

CMD ["node", "dist/src/main.js"]