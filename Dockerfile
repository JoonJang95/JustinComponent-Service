FROM node:10.13.0
WORKDIR /usr/src/app
# RUN mkdir -p /usr/src/app/database/data
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build 
# && npm run sdc2csvGen

EXPOSE 9000

CMD ["npm", "start"]