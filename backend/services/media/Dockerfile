# Media Service - Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Final stage
FROM node:20-alpine

RUN apk --no-cache add curl ffmpeg

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Create upload directory
RUN mkdir -p /app/uploads

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app/uploads

USER nodejs

EXPOSE 8005

CMD ["node", "index.js"]
