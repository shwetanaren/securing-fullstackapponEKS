FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optional: ensure knex CLI is available
RUN npm install -g knex

EXPOSE 3001

CMD ["sh", "-c", "sleep 10 && npx knex migrate:latest && node server.js"]

