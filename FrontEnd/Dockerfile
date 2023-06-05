FROM node:gallium-alpine3.17

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]
