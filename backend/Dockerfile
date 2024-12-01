# Backend Dockerfile
# backend/Dockerfile
FROM node:16

# Install build dependencies
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

COPY package*.json ./

# Clean install dependencies and rebuild bcrypt
RUN npm ci
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
