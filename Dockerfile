FROM node:20-alpine AS web-build
WORKDIR /source
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html tsconfig*.json vite.config.ts tailwind.config.ts postcss.config.js components.json ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM node:20-alpine AS backend-dependencies
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime
ENV NODE_ENV=production APP_HOST=0.0.0.0 BACKEND_PORT=3061 FRONTEND_DIST=/app/dist MEDIA_STORAGE_ROOT=/data/media
WORKDIR /app
COPY --from=backend-dependencies /app/backend/node_modules ./backend/node_modules
COPY backend ./backend
COPY --from=web-build /source/dist ./dist
RUN mkdir -p /data/media && chown -R node:node /app /data/media
USER node
EXPOSE 3061
VOLUME ["/data/media"]
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:3061/api/health/ready').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["sh", "-c", "node backend/db/migrate.js --check && exec node backend/server.js"]
