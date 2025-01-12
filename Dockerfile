# Stage 1: Build React frontend
FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY client/package*.json ./client/
RUN npm ci --prefix client
COPY client/ ./client
RUN npm run build --prefix client

# Stage 2: Build backend and include frontend
FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
COPY --from=builder /usr/src/app/client/dist ./client/dist
EXPOSE 5000
CMD ["npm", "start"]
