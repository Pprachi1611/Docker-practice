# Stage 1: Build React Application

FROM node:24-alpine AS build

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Serve React App using Nginx

FROM nginx:alpine

COPY --from=build /home/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]