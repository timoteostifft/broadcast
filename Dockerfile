FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm run generate-certs

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start"]