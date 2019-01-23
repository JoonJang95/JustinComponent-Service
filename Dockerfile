FROM node:10.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]