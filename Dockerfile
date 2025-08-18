FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

RUN apt-get update && apt-get install -y python3 make g++ && pnpm install

COPY . .

EXPOSE 3333

CMD ["pnpm", "run", "start"]
