# dev stage
FROM node:12.13-alpine as development

WORKDIR /usr/src/web

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# prod stage
FROM node:12.13-alpine as production

WORKDIR /usr/src/web

COPY package.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/web/dist ./dist

CMD ["node", "dist/main"]