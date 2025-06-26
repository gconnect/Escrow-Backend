FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

RUN npx prisma generate

COPY . .

RUN npm run build

# Verify build output
RUN ls -la /app/dist 

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production
RUN npx prisma generate

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Verify copied files
RUN ls -la /app/dist  # Debugging line
EXPOSE 8080

CMD ["node", "dist/main"]
