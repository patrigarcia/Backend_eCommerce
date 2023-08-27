FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 9001

CMD [ "node", "server.js" ]
