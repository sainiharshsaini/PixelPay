FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY ../../packages/db/package.json ../../packages/db/
COPY ../../packages/validation-schemas/package.json ../../packages/validation-schemas/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .
COPY ../../packages/db ./packages/db
COPY ../../packages/validation-schemas ./packages/validation-schemas

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
