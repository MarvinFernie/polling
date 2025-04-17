# Use Node.js 18 as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM deps AS builder
COPY . .
# Set environment variables for build if needed
ENV NEXT_PUBLIC_APP_URL=https://initial-empty-app-icy-water-4308.fly.dev
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 8080
# Host on all interfaces for proper container networking
ENV HOST 0.0.0.0

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public || true
COPY --from=builder /app/package.json ./package.json

# Copy additional files if needed for runtime (like .env.local)
COPY --from=builder /app/.env.local ./.env.local 2>/dev/null || :

# Set the correct permission for prerender cache
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set proper permissions
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 8080

# Start the application, specifying the hostname for container networking
CMD ["node", "server.js"]