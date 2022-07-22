FROM node:alpine as build-deps
WORKDIR /demo_project_client
COPY . .
RUN npm install --force\
    && npm run build

FROM nginx:alpine
COPY --from=build-deps /demo_project_client/build /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]