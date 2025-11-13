
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./


RUN npm ci --only=production

RUN npm install -g pm2

COPY . .


EXPOSE 5000

# Start app with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]