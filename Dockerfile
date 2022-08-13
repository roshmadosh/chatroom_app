FROM node:16

WORKDIR /chat_app

COPY package.json /chat_app

RUN npm install

COPY . /chat_app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]