FROM node:16-alpine
MAINTAINER mrbontor@gmail.com

RUN apk update; apk add tzdata

# create app directory
WORKDIR /app

COPY .env ./
COPY .prettierrc.json ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# Environment
ENV NODE_ENV development

# Run the command on container startup
ENTRYPOINT ["npm", "start"]
