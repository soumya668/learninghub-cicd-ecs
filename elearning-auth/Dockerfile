FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 2000
#CMD ["npm","run","dev"]
#ENTRYPOINT ["npm","run","dev"]
ENTRYPOINT ["npm","run"]
CMD ["dev"]
