FROM node:19.0.1-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .
ARG NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

#Segunda Etapa
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/web-ksp /usr/share/nginx/html
COPY /server/nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80