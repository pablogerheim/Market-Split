FROM node:alpine
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3002
CMD [ "npm", "start"]
