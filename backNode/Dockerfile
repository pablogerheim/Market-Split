FROM node:alpine
WORKDIR /app/back
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3002
CMD [ "npm", "start"]
