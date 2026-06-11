FROM node:20-slim

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package configuration
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application source
COPY . .

# Build application (generates dist/ and dist/server.cjs)
RUN npm run build

# Expose server port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the built production server
CMD ["node", "dist/server.cjs"]
