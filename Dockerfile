FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && ln -sf python3 /usr/bin/python

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

