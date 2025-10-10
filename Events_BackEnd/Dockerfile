# Dockerfile для Angular
FROM node:20 AS build
WORKDIR /app
COPY ../Angular_Frontend/events-management-app .
RUN npm ci && npm run build -- --configuration=production

FROM nginx:stable-alpine
COPY --from=build /app/dist/events-management-app /usr/share/nginx/html
COPY ../Angular_Frontend/events-management-app/public/favicon.ico /usr/share/nginx/html/favicon.ico
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

