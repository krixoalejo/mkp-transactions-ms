FROM node:21 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:21-slim

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src
COPY ormconfig.json ./

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Mostrar información sobre los archivos copiados para diagnóstico
RUN ls -la dist/src/entity && \
    echo "TypeORM config:" && \
    cat ormconfig.json

CMD ["node", "dist/src/index.js"]