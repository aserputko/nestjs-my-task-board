# Use an official Node.js image as the base for building the app
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20

WORKDIR /app
# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD npm run migration:run:production && node dist/src/main.js
