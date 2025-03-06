FROM node:18-bullseye-slim

# Set working directory
WORKDIR /usr/app

# Install pnpm globally
RUN npm install -g pnpm

# Install PM2 globally
RUN npm install --global pm2

# Copy "pnpm-lock.yaml" and "package.json" before other files
COPY ./pnpm-lock.yaml ./package.json ./

# Install ALL dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile

# Copy all files
COPY ./ ./

# Build app
RUN pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "pnpm", "--", "start" ]