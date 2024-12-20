# build stage
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV VUE_APP_CLIENT_ID=xsisacademy.ui
ENV VUE_APP_LIFE_TIME=10

# # # API Base URL for Local
ENV VUE_APP_BASE_API_URL=http://localhost:7000
ENV VUE_APP_AUTHORITY=https://auth-dev.equine.co.id

# # API Base URL for Container
# ENV VUE_APP_BASE_API_URL=http://gateway:7000
# ENV VUE_APP_AUTHORITY=https://auth-dev.equine.co.id


# API Base URL for Production
# ENV VUE_APP_BASE_API_URL=https://alisa.xsis.co.id/academy
# ENV VUE_APP_AUTHORITY=https://auth.equine.co.id


RUN npm run build
# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
