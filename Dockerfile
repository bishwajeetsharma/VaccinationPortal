FROM node:latest as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

CMD ["ng", "serve", "--prod", "--proxy-config", "proxy.conf.json"]

FROM nginx:alpine
EXPOSE 80
COPY --from=builder app/dist/VaccinationPortal usr/share/nginx/html